// =========================================
// LA POPULAR — CONFIGURACIÓN
// =========================================

const numeroWhatsApp = "5492645782637";

// =========================================
// CAMISETAS
// =========================================

const camisetas = [
    { nombre: "Barcelona Edicion Especial", categoria: "europa", imagen: "img/barcelonasuplente.png" },
    { nombre: "Chelsea T90", categoria: "europa", imagen: "img/chelseasuplente.jpg" },
    { nombre: "Argentina Titular 2026", categoria: "selecciones", imagen: "img/messi.jpg" },
    { nombre: "Argentina Suplente 2026", categoria: "selecciones", imagen: "img/argentinasuplente.jpg" },
    { nombre: "Manchester City Suplente 2026", categoria: "europa", imagen: "img/citynegra.jpg" },
    { nombre: "AC Milan 2026", categoria: "europa", imagen: "img/milan.jpg" },
    { nombre: "Corinthians Suplente 2025", categoria: "nacional", imagen: "img/depay.jpg" },
    { nombre: "PSG Quinta 2026", categoria: "europa", imagen: "img/psgsuplente.jpg" },
    { nombre: "Brasil Titular 2026", categoria: "selecciones", imagen: "img/brasiltitular.jpg" },
    { nombre: "Manchester United Titular 2026", categoria: "europa", imagen: "img/united2026.jpg" },
    { nombre: "Liverpool Titular 2026", categoria: "europa", imagen: "img/liverpool.png" },
    { nombre: "Palmeiras Suplente 2026", categoria: "nacional", imagen: "img/palmeiras.jpeg" },
    { nombre: "Manchester City Titular 2026", categoria: "europa", imagen: "img/city2027.jpg" },
    { nombre: "Barcelona Retro 2026", categoria: "retro", imagen: "img/fermin2.png" },
    { nombre: "Racing Titular 2026", categoria: "nacional", imagen: "img/racing2026.jpg" },
    { nombre: "Boca Titular 2026", categoria: "nacional", imagen: "img/boca2026.jpg" },
    { nombre: "Boca 120 años Aniversario", categoria: "nacional", imagen: "img/boca120.jpg" },
    { nombre: "River Titular 2026", categoria: "nacional", imagen: "img/rivertitular2027.jpg" },
    { nombre: "River Suplente 2026", categoria: "nacional", imagen: "img/river2027.jpg" },
    { nombre: "Barcelona Suplente 2026", categoria: "europa", imagen: "img/barcelonamorada.jpg" },
    { nombre: "Barcelona Titular 2026", categoria: "europa", imagen: "img/barca2027.jpg" },
    { nombre: "COMO Titular 2026", categoria: "europa", imagen: "img/Como.jpg" }
];

// =========================================
// SHORTS
// =========================================

const shorts = [
    { nombre: "River Plate Short", imagen: "img/rivershort.png" },
    { nombre: "Milan Short", imagen: "img/modricshort.jpg" },
    { nombre: "Argentina Entrenamiento Short", imagen: "img/messishort.jpg" },
    { nombre: "Juventus Short", imagen: "img/yildizshort.jpg" },
    { nombre: "Holanda Short", imagen: "img/gakposhort.jpg" },
    { nombre: "Bayern Munich Short", imagen: "img/musialashort.jpg" }
];

// =========================================
// ELEMENTOS Y ESTADO
// =========================================

const contenedorProductos = document.getElementById("contenedorProductos");
const contenedorShorts = document.getElementById("contenedorShorts");
const buscador = document.getElementById("searchInput");
const botonesFiltro = document.querySelectorAll(".categorias [data-filter]");
const topBtn = document.getElementById("topBtn");

let categoriaActiva = "todos";
let textoBusqueda = "";

// =========================================
// CREAR TARJETAS
// =========================================

function crearTarjeta(producto, tipo) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "card";

    // Imagen del producto
    const botonImagen = document.createElement("button");
    botonImagen.type = "button";
    botonImagen.className = "imagen-producto";
    botonImagen.setAttribute("aria-label", `Ampliar imagen de ${producto.nombre}`);

    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;
    imagen.className = "producto-img";
    imagen.loading = "lazy";
    imagen.decoding = "async";

    imagen.addEventListener("error", () => {
        tarjeta.classList.add("imagen-no-disponible");
        imagen.alt = `No se pudo cargar la imagen de ${producto.nombre}`;
    });

    const detalle = document.createElement("span");
    detalle.className = "ver-detalle";
    detalle.textContent = "VER DETALLE";

    botonImagen.append(imagen, detalle);
    botonImagen.addEventListener("click", () => abrirModal(producto));

    // Información
    const info = document.createElement("div");
    info.className = "info";

    const etiqueta = document.createElement("span");
    etiqueta.className = "etiqueta";
    etiqueta.textContent = tipo === "short"
        ? "SHORTS"
        : producto.categoria.toUpperCase();

    const nombre = document.createElement("h3");
    nombre.textContent = producto.nombre;

    const calidad = document.createElement("p");
    calidad.className = "talles-resumen";
    calidad.textContent = "Calidad premium · Consultar talles";

    // Botón de consulta
    const consultarBtn = document.createElement("button");
    consultarBtn.type = "button";
    consultarBtn.className = "btn-consultar";
    consultarBtn.innerHTML =
        '<i class="fab fa-whatsapp" aria-hidden="true"></i> CONSULTAR';

    consultarBtn.addEventListener("click", () => {
        consultar(producto.nombre, tipo);
    });

    info.append(etiqueta, nombre, calidad, consultarBtn);
    tarjeta.append(botonImagen, info);

    return tarjeta;
}

// =========================================
// MOSTRAR CAMISETAS
// =========================================

function mostrarProductos(lista) {
    if (!contenedorProductos) return;

    contenedorProductos.replaceChildren();

    if (lista.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.className = "sin-resultados";
        mensaje.textContent =
            "No encontramos camisetas con esa búsqueda.";

        contenedorProductos.appendChild(mensaje);
        return;
    }

    const fragmento = document.createDocumentFragment();

    lista.forEach(producto => {
        fragmento.appendChild(crearTarjeta(producto, "camiseta"));
    });

    contenedorProductos.appendChild(fragmento);
}

// =========================================
// MOSTRAR SHORTS
// =========================================

function mostrarShorts(lista) {
    if (!contenedorShorts) return;

    contenedorShorts.replaceChildren();

    if (lista.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.className = "sin-resultados";
        mensaje.textContent =
            "No encontramos shorts con esa búsqueda.";

        contenedorShorts.appendChild(mensaje);
        return;
    }

    const fragmento = document.createDocumentFragment();

    lista.forEach(producto => {
        fragmento.appendChild(crearTarjeta(producto, "short"));
    });

    contenedorShorts.appendChild(fragmento);
}

// =========================================
// BUSCADOR Y FILTROS
// =========================================

function actualizarCatalogo() {
    const camisetasFiltradas = camisetas.filter(camiseta => {
        const coincideTexto = camiseta.nombre
            .toLocaleLowerCase("es")
            .includes(textoBusqueda);

        const coincideCategoria =
            categoriaActiva === "todos" ||
            camiseta.categoria === categoriaActiva;

        return coincideTexto && coincideCategoria;
    });

    const shortsFiltrados = shorts.filter(short =>
        short.nombre
            .toLocaleLowerCase("es")
            .includes(textoBusqueda)
    );

    mostrarProductos(camisetasFiltradas);
    mostrarShorts(shortsFiltrados);
}

// Buscar mientras escribís
if (buscador) {
    buscador.addEventListener("input", () => {
        textoBusqueda = buscador.value
            .trim()
            .toLocaleLowerCase("es");

        actualizarCatalogo();
    });
}

// Filtrar por categoría
botonesFiltro.forEach(boton => {
    boton.addEventListener("click", () => {
        categoriaActiva = boton.dataset.filter || "todos";

        botonesFiltro.forEach(btn => {
            const activo = btn === boton;

            btn.classList.toggle("active", activo);
            btn.setAttribute("aria-pressed", String(activo));
        });

        actualizarCatalogo();
    });
});

// =========================================
// CONSULTAR POR WHATSAPP
// =========================================

function consultar(nombre, tipo = "camiseta") {
    const articulo = tipo === "short"
        ? "el short"
        : "la camiseta";

    const mensaje =
        `¡Hola! 👋 Quisiera consultar por ${articulo} ${nombre}. ` +
        "¿Me pasan los talles disponibles y el precio?";

    const url =
        `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank", "noopener,noreferrer");
}

// =========================================
// MODAL DE IMAGEN
// =========================================

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const cerrarModalBtn = document.querySelector(".cerrar");

let elementoAntesDelModal = null;

function abrirModal(producto) {
    if (!modal || !modalImg) return;

    elementoAntesDelModal = document.activeElement;

    modalImg.src = producto.imagen;
    modalImg.alt = producto.nombre;

    modal.style.display = "flex";
    modal.classList.add("abierto");
    modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-abierto");

    if (cerrarModalBtn) {
        cerrarModalBtn.focus();
    }
}

function cerrarModal() {
    if (!modal || !modalImg) return;

    modal.style.display = "none";
    modal.classList.remove("abierto");
    modal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-abierto");

    modalImg.src = "";

    if (
        elementoAntesDelModal &&
        typeof elementoAntesDelModal.focus === "function"
    ) {
        elementoAntesDelModal.focus();
    }
}

if (cerrarModalBtn) {
    cerrarModalBtn.addEventListener("click", cerrarModal);
}

if (modal) {
    modal.addEventListener("click", evento => {
        if (evento.target === modal) {
            cerrarModal();
        }
    });
}

document.addEventListener("keydown", evento => {
    if (
        evento.key === "Escape" &&
        modal &&
        modal.style.display === "flex"
    ) {
        cerrarModal();
    }
});

// =========================================
// BOTÓN VOLVER ARRIBA
// =========================================

function actualizarBotonArriba() {
    if (!topBtn) return;

    topBtn.classList.toggle("visible", window.scrollY > 500);
}

window.addEventListener("scroll", actualizarBotonArriba, {
    passive: true
});

if (topBtn) {
    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// =========================================
// INICIAR CATÁLOGO
// =========================================

actualizarCatalogo();
actualizarBotonArriba();
