
/* =========================================
   LA POPULAR — CATÁLOGO Y GALERÍA
========================================= */

const numeroWhatsApp = "5492645782637";

const camisetas = [
    {
        nombre: "Bayern Munchen Suplente 26/27",
        categoria: "europa",
        imagen: "img/bayer.png",
        imagenes: [
            "img/bayer1.png",
            "img/bayer2.png",
            "img/bayer3.png"
        ],
        precio: 49990,
        talles: ["Sin Stock"]
    },
    {
        nombre: "Boca Titular 26/27",
        categoria: "nacional",
        imagen: "img/pareti2.png",
        imagenes: [
            "img/pareti1.png",
            "img/pareti.png",
            "img/bocati.png"
        ],
        precio: 49990,
        talles: ["Sin Stock"]
    }
];

const shorts = [
    { nombre: "River Plate Short", categoria: "shorts", imagen: "img/rivershort.png", precio: null, talles: ["S", "M", "L", "XL"] },
    { nombre: "Milan Short", categoria: "shorts", imagen: "img/modricshort.jpg", precio: null, talles: ["S", "M", "L", "XL"] },
    { nombre: "Argentina Entrenamiento Short", categoria: "shorts", imagen: "img/messishort.jpg", precio: null, talles: ["S", "M", "L", "XL"] },
    { nombre: "Juventus Short", categoria: "shorts", imagen: "img/yildizshort.jpg", precio: null, talles: ["S", "M", "L", "XL"] },
    { nombre: "Holanda Short", categoria: "shorts", imagen: "img/gakposhort.jpg", precio: null, talles: ["S", "M", "L", "XL"] },
    { nombre: "Bayern Munich Short", categoria: "shorts", imagen: "img/bayern.png", precio: 39990, talles: ["XL"] }
];

/* ELEMENTOS HTML */

const contenedor = document.getElementById("contenedorProductos");
const contenedorShorts = document.getElementById("contenedorShorts");
const modal = document.getElementById("modalProducto");
const cerrarModal = document.querySelector(".cerrar-producto");

const detalleImg = document.getElementById("detalleImg");
const detalleNombre = document.getElementById("detalleNombre");
const detallePrecio = document.getElementById("detallePrecio");
const detalleCategoria = document.getElementById("detalleCategoria");
const detalleTalles = document.getElementById("detalleTalles");
const detalleWhatsApp = document.getElementById("detalleWhatsApp");

/* ELEMENTOS DEL CARRUSEL */

const galeria = document.getElementById("galeriaProducto");
const fotoAnterior = document.getElementById("detalleAnterior");
const fotoSiguiente = document.getElementById("detalleSiguiente");
const contadorFotos = document.getElementById("detalleContador");
const indicadoresFotos = document.getElementById("detalleIndicadores");

let productoSeleccionado = null;
let talleSeleccionado = "";
let imagenesProducto = [];
let indiceImagen = 0;
let elementoAnterior = null;
let inicioDeslizamientoX = 0;
let inicioDeslizamientoY = 0;

// Caché de imágenes precargadas.
const cacheImagenes = new Map();

/* =========================================
   PRECARGA DE IMÁGENES
========================================= */

function precargarImagen(ruta) {
    if (!ruta) return Promise.resolve(null);

    if (cacheImagenes.has(ruta)) {
        return cacheImagenes.get(ruta);
    }

    const promesa = new Promise(resolve => {
        const imagen = new Image();

        imagen.decoding = "async";

        imagen.onload = () => resolve(imagen);
        imagen.onerror = () => resolve(null);

        imagen.src = ruta;

        // También contempla imágenes que ya estaban en caché.
        if (imagen.complete && imagen.naturalWidth > 0) {
            resolve(imagen);
        }
    });

    cacheImagenes.set(ruta, promesa);
    return promesa;
}

function precargarGaleria(rutas) {
    rutas.forEach(ruta => {
        precargarImagen(ruta);
    });
}

/* FORMATO DE PRECIOS */

const formatoPrecio = precio => {
    if (precio === null || precio === undefined || precio === "") {
        return "Consultar precio";
    }

    return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0
    }).format(precio);
};

/* OBTENER FOTOS DE CADA PRODUCTO */

function obtenerImagenes(producto) {
    const lista = Array.isArray(producto.imagenes)
        ? producto.imagenes
        : [];

    return [...new Set([producto.imagen, ...lista].filter(Boolean))];
}

/* =========================================
   CREAR TARJETAS
========================================= */

function crearTarjeta(producto, indice, tipo) {
    const card = document.createElement("article");
    card.className = "card";

    const imagenes = obtenerImagenes(producto);

    const tipoEtiqueta = tipo === "short"
        ? "SHORTS"
        : producto.categoria.toUpperCase();

    card.innerHTML = `
        <button
            class="imagen-producto"
            type="button"
            aria-label="Ver detalles de ${producto.nombre}"
            data-producto="${indice}"
            data-tipo="${tipo}">

            <img
                src="${producto.imagen}"
                alt="${producto.nombre}"
                class="producto-img"
                loading="lazy"
                decoding="async">

            <span class="ver-detalle">
                <i class="fa-solid fa-eye" aria-hidden="true"></i>
                Ver detalles
            </span>
        </button>

        <div class="info">
            <span class="etiqueta">${tipoEtiqueta}</span>
            <h3>${producto.nombre}</h3>
            <p class="precio">${formatoPrecio(producto.precio)}</p>

            <p class="talles-resumen">
                Talles: ${producto.talles.join(" · ")}
            </p>

            <button
                class="btn-consultar"
                type="button"
                data-producto="${indice}"
                data-tipo="${tipo}">
                VER TALLES Y CONSULTAR
                <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </button>
        </div>
    `;

    if (imagenes.length > 1) {
        card.querySelector(".ver-detalle").innerHTML =
            '<i class="fa-solid fa-images" aria-hidden="true"></i> Ver fotos';
    }

    return card;
}

/* MOSTRAR CAMISETAS */

function mostrarProductos(lista) {
    if (!contenedor) return;

    contenedor.replaceChildren();

    if (!lista.length) {
        const mensaje = document.createElement("p");
        mensaje.className = "sin-resultados";
        mensaje.textContent =
            "No encontramos camisetas con esa búsqueda.";

        contenedor.appendChild(mensaje);
        return;
    }

    const fragmento = document.createDocumentFragment();

    lista.forEach(producto => {
        fragmento.appendChild(
            crearTarjeta(
                producto,
                camisetas.indexOf(producto),
                "camiseta"
            )
        );
    });

    contenedor.appendChild(fragmento);
}

/* MOSTRAR SHORTS */

function mostrarShorts(lista) {
    if (!contenedorShorts) return;

    contenedorShorts.replaceChildren();

    if (!lista.length) {
        const mensaje = document.createElement("p");
        mensaje.className = "sin-resultados";
        mensaje.textContent =
            "No encontramos shorts con esa búsqueda.";

        contenedorShorts.appendChild(mensaje);
        return;
    }

    const fragmento = document.createDocumentFragment();

    lista.forEach(producto => {
        fragmento.appendChild(
            crearTarjeta(
                producto,
                shorts.indexOf(producto),
                "short"
            )
        );
    });

    contenedorShorts.appendChild(fragmento);
}

/* =========================================
   CARRUSEL DE FOTOS
========================================= */

function actualizarGaleria() {
    if (!productoSeleccionado || !detalleImg) return;

    const total = imagenesProducto.length;
    if (!total) return;

    indiceImagen = (indiceImagen + total) % total;

    const nuevaRuta = imagenesProducto[indiceImagen];
    const hayVariasFotos = total > 1;

    // Actualizar controles inmediatamente.

    if (fotoAnterior) {
        fotoAnterior.hidden = !hayVariasFotos;
    }

    if (fotoSiguiente) {
        fotoSiguiente.hidden = !hayVariasFotos;
    }

    if (contadorFotos) {
        contadorFotos.hidden = !hayVariasFotos;
        contadorFotos.textContent =
            `${indiceImagen + 1} / ${total}`;
    }

    // Actualizar indicadores.

    if (indicadoresFotos) {
        indicadoresFotos.replaceChildren();

        if (hayVariasFotos) {
            imagenesProducto.forEach((imagen, indice) => {
                const punto = document.createElement("button");

                punto.type = "button";
                punto.className = "galeria-punto";

                punto.classList.toggle(
                    "activo",
                    indice === indiceImagen
                );

                punto.setAttribute(
                    "aria-label",
                    `Ver foto ${indice + 1}`
                );

                punto.setAttribute(
                    "aria-current",
                    indice === indiceImagen ? "true" : "false"
                );

                punto.addEventListener("click", () => {
                    indiceImagen = indice;
                    actualizarGaleria();
                });

                indicadoresFotos.appendChild(punto);
            });
        }
    }

    detalleImg.alt =
        `${productoSeleccionado.nombre} — Foto ${indiceImagen + 1}`;

    // Si ya está mostrando esta foto, no volver a cargarla.
    if (
        detalleImg.dataset.rutaActual === nuevaRuta &&
        detalleImg.complete &&
        detalleImg.naturalWidth > 0
    ) {
        return;
    }

    // Mostrar la nueva foto apenas esté disponible.
    precargarImagen(nuevaRuta).then(imagenCargada => {
        // Evitar mostrar una foto vieja si el usuario siguió deslizando.
        if (
            !imagenCargada ||
            !productoSeleccionado ||
            imagenesProducto[indiceImagen] !== nuevaRuta
        ) {
            return;
        }

        if (detalleImg.src !== imagenCargada.src) {
            detalleImg.src = imagenCargada.src;
        }

        detalleImg.dataset.rutaActual = nuevaRuta;
    });
}

function cambiarImagen(direccion) {
    if (imagenesProducto.length <= 1) return;

    indiceImagen =
        (indiceImagen + direccion + imagenesProducto.length) %
        imagenesProducto.length;

    actualizarGaleria();
}

/* ABRIR FICHA DEL PRODUCTO */

function abrirDetalle(indice, tipo = "camiseta") {
    productoSeleccionado = tipo === "short"
        ? shorts[indice]
        : camisetas[indice];

    if (!productoSeleccionado || !modal) return;

    elementoAnterior = document.activeElement;
    talleSeleccionado = productoSeleccionado.talles[0] || "";

    imagenesProducto = obtenerImagenes(productoSeleccionado);
    indiceImagen = 0;

    // Precargar las fotos en segundo plano.
    precargarGaleria(imagenesProducto);

    if (detalleImg) {
        detalleImg.dataset.rutaActual = "";
    }

    actualizarGaleria();

    if (detalleNombre) {
        detalleNombre.textContent = productoSeleccionado.nombre;
    }

    if (detallePrecio) {
        detallePrecio.textContent =
            formatoPrecio(productoSeleccionado.precio);
    }

    if (detalleCategoria) {
        detalleCategoria.textContent =
            tipo === "short"
                ? "SHORTS"
                : productoSeleccionado.categoria.toUpperCase();
    }

    if (detalleTalles) {
        detalleTalles.replaceChildren();

        productoSeleccionado.talles.forEach(talle => {
            const boton = document.createElement("button");

            boton.type = "button";
            boton.className = "talle-opcion";
            boton.textContent = talle;

            boton.classList.toggle(
                "seleccionado",
                talle === talleSeleccionado
            );

            boton.setAttribute(
                "aria-pressed",
                String(talle === talleSeleccionado)
            );

            boton.addEventListener("click", () => {
                talleSeleccionado = talle;

                detalleTalles
                    .querySelectorAll(".talle-opcion")
                    .forEach(opcion => {
                        const seleccionado = opcion === boton;

                        opcion.classList.toggle(
                            "seleccionado",
                            seleccionado
                        );

                        opcion.setAttribute(
                            "aria-pressed",
                            String(seleccionado)
                        );
                    });

                if (detalleWhatsApp) {
                    detalleWhatsApp.disabled = !talleSeleccionado;
                }
            });

            detalleTalles.appendChild(boton);
        });
    }

    if (detalleWhatsApp) {
        detalleWhatsApp.disabled = !talleSeleccionado;
    }

    modal.classList.add("abierto");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-abierto");

    if (cerrarModal) cerrarModal.focus();
}

/* CERRAR FICHA */

function cerrarDetalle() {
    if (!modal) return;

    modal.classList.remove("abierto");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-abierto");

    if (
        elementoAnterior &&
        typeof elementoAnterior.focus === "function"
    ) {
        elementoAnterior.focus();
    }
}

/* CLIC EN LAS TARJETAS */

function manejarClickProducto(evento) {
    const boton = evento.target.closest("[data-producto]");

    if (!boton) return;

    abrirDetalle(
        Number(boton.dataset.producto),
        boton.dataset.tipo || "camiseta"
    );
}

if (contenedor) {
    contenedor.addEventListener("click", manejarClickProducto);
}

if (contenedorShorts) {
    contenedorShorts.addEventListener("click", manejarClickProducto);
}

/* CONTROLES DE LA GALERÍA */

if (fotoAnterior) {
    fotoAnterior.addEventListener("click", () => {
        cambiarImagen(-1);
    });
}

if (fotoSiguiente) {
    fotoSiguiente.addEventListener("click", () => {
        cambiarImagen(1);
    });
}

/* DESLIZAR CON EL DEDO EN CELULARES */

if (galeria) {
    galeria.addEventListener("touchstart", evento => {
        const toque = evento.changedTouches[0];

        inicioDeslizamientoX = toque.clientX;
        inicioDeslizamientoY = toque.clientY;
    }, { passive: true });

    galeria.addEventListener("touchend", evento => {
        const toque = evento.changedTouches[0];

        const diferenciaX =
            toque.clientX - inicioDeslizamientoX;

        const diferenciaY =
            toque.clientY - inicioDeslizamientoY;

        if (
            Math.abs(diferenciaX) > 45 &&
            Math.abs(diferenciaX) >
                Math.abs(diferenciaY) * 1.2
        ) {
            cambiarImagen(diferenciaX < 0 ? 1 : -1);
        }
    }, { passive: true });
}

/* TECLAS DEL TECLADO */

document.addEventListener("keydown", evento => {
    if (!modal || !modal.classList.contains("abierto")) return;

    if (evento.key === "Escape") {
        cerrarDetalle();
    }

    if (evento.key === "ArrowLeft") {
        cambiarImagen(-1);
    }

    if (evento.key === "ArrowRight") {
        cambiarImagen(1);
    }
});

/* CERRAR CON LA X O TOCANDO FUERA DE LA FICHA */

if (cerrarModal) {
    cerrarModal.addEventListener("click", cerrarDetalle);
}

if (modal) {
    modal.addEventListener("click", evento => {
        if (evento.target === modal) {
            cerrarDetalle();
        }
    });
}

/* CONSULTAR POR WHATSAPP */

if (detalleWhatsApp) {
    detalleWhatsApp.addEventListener("click", () => {
        if (!productoSeleccionado || !talleSeleccionado) return;

        const precioMensaje =
            productoSeleccionado.precio == null
                ? "Quisiera consultar el precio"
                : `Precio publicado: ${formatoPrecio(
                    productoSeleccionado.precio
                )}`;

        const mensaje =
            `¡Hola, La Popular! 👋 Quisiera consultar por ` +
            `${productoSeleccionado.nombre}. ` +
            `Talle: ${talleSeleccionado}. ` +
            `${precioMensaje}. ¿Está disponible?`;

        const url =
            `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
                mensaje
            )}`;

        window.open(url, "_blank", "noopener,noreferrer");
    });
}

/* BÚSQUEDA Y FILTROS */

const buscador = document.getElementById("searchInput");
let categoriaActiva = "todos";

function actualizarCatalogo() {
    const texto = buscador
        ? buscador.value.trim().toLocaleLowerCase("es")
        : "";

    const filtradas = camisetas.filter(producto => {
        const coincideTexto =
            producto.nombre.toLocaleLowerCase("es").includes(texto);

        const coincideCategoria =
            categoriaActiva === "todos" ||
            producto.categoria === categoriaActiva;

        return coincideTexto && coincideCategoria;
    });

    const shortsFiltrados = shorts.filter(producto =>
        producto.nombre.toLocaleLowerCase("es").includes(texto)
    );

    mostrarProductos(filtradas);
    mostrarShorts(shortsFiltrados);
}

if (buscador) {
    buscador.addEventListener("input", actualizarCatalogo);
}

document.querySelectorAll(".categorias button").forEach(boton => {
    boton.addEventListener("click", () => {
        document.querySelectorAll(".categorias button").forEach(btn => {
            btn.classList.remove("active");
        });

        boton.classList.add("active");
        categoriaActiva = boton.dataset.filter || "todos";

        actualizarCatalogo();
    });
});

/* BOTÓN VOLVER ARRIBA */

const topBtn = document.getElementById("topBtn");

function actualizarBotonArriba() {
    if (!topBtn) return;

    topBtn.classList.toggle(
        "visible",
        window.scrollY > 500
    );
}

window.addEventListener(
    "scroll",
    actualizarBotonArriba,
    { passive: true }
);

if (topBtn) {
    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/* INICIAR CATÁLOGO */

actualizarCatalogo();
actualizarBotonArriba();
