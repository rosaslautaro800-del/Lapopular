// =========================================
// CONFIGURACIÓN DE LA POPULAR
// Editá precio y talles de cada producto según tu stock real.
// =========================================
const numeroWhatsApp = "5492645782637";

const camisetas = [
    { nombre: "Barcelona Edición Especial", categoria: "europa", imagen: "img/barcelonasuplente.png", precio: 27500, talles: ["S", "M", "L", "XL"] },
    { nombre: "Chelsea T90", categoria: "europa", imagen: "img/chelseasuplente.jpg", precio: 30000, talles: ["M", "L", "XL"] },
    { nombre: "Argentina Titular 2026", categoria: "selecciones", imagen: "img/messi.jpg", precio: 30000, talles: ["S", "M", "L", "XL", "XXL"] },
    { nombre: "Argentina Suplente 2026", categoria: "selecciones", imagen: "img/argentinasuplente.jpg", precio: 30000, talles: ["S", "M", "L", "XL"] },
    { nombre: "Manchester City Suplente 2026", categoria: "europa", imagen: "img/citynegra.jpg", precio: 30000, talles: ["M", "L", "XL"] },
    { nombre: "AC Milan 2026", categoria: "europa", imagen: "img/milan.jpg", precio: 30000, talles: ["S", "M", "L", "XL"] },
    { nombre: "Corinthians Suplente 2025", categoria: "nacional", imagen: "img/depay.jpg", precio: 30000, talles: ["M", "L", "XL"] },
    { nombre: "PSG Quinta 2026", categoria: "europa", imagen: "img/psgsuplente.jpg", precio: 30000, talles: ["S", "M", "L", "XL"] },
    { nombre: "Manchester City Titular 26/27", categoria: "europa", imagen: "img/city2027.jpg", precio: 30000, talles: ["S", "M", "L", "XL"] }
];

// SHORTS: completá los precios y cambiá las rutas de imagen cuando quieras.
// Los archivos de estas imágenes no venían dentro del ZIP original.
const shorts = [
    { nombre: "River Plate Short", categoria: "shorts", imagen: "img/rivershort.png", precio: null, talles: ["S", "M", "L", "XL"] },
    { nombre: "Milan Short", categoria: "shorts", imagen: "img/modricshort.jpg", precio: null, talles: ["S", "M", "L", "XL"] },
    { nombre: "Argentina Entrenamiento Short", categoria: "shorts", imagen: "img/messishort.jpg", precio: null, talles: ["S", "M", "L", "XL"] },
    { nombre: "Juventus Short", categoria: "shorts", imagen: "img/yildizshort.jpg", precio: null, talles: ["S", "M", "L", "XL"] },
    { nombre: "Holanda Short", categoria: "shorts", imagen: "img/gakposhort.jpg", precio: null, talles: ["S", "M", "L", "XL"] },
    { nombre: "Bayern Munich Short", categoria: "shorts", imagen: "img/musialashort.jpg", precio: null, talles: ["S", "M", "L", "XL"] }
];

const contenedor = document.getElementById("contenedorProductos");
const contenedorShorts = document.getElementById("contenedorShorts");
const modal = document.getElementById("modalProducto");
const cerrarModal = document.querySelector(".cerrar-producto");
let productoSeleccionado = null;
let talleSeleccionado = "";

const formatoPrecio = precio => {
    if (precio === null || precio === undefined || precio === "") return "Consultar precio";
    return new Intl.NumberFormat("es-AR", {
        style: "currency", currency: "ARS", maximumFractionDigits: 0
    }).format(precio);
};

function crearTarjeta(producto, indice, tipo) {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
        <button class="imagen-producto" type="button" aria-label="Ver ${producto.nombre}" data-producto="${indice}" data-tipo="${tipo}">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img" loading="lazy">
            <span class="ver-detalle"><i class="fa-solid fa-eye"></i> Ver detalles</span>
        </button>
        <div class="info">
            <span class="etiqueta">${tipo === "short" ? "SHORTS" : producto.categoria.toUpperCase()}</span>
            <h3>${producto.nombre}</h3>
            <p class="precio">${formatoPrecio(producto.precio)}</p>
            <p class="talles-resumen">Talles: ${producto.talles.join(" · ")}</p>
            <button class="btn-consultar" type="button" data-producto="${indice}" data-tipo="${tipo}">VER TALLES Y CONSULTAR <i class="fa-solid fa-arrow-right"></i></button>
        </div>`;
    return card;
}

function mostrarProductos(lista) {
    contenedor.innerHTML = "";
    if (!lista.length) {
        contenedor.innerHTML = '<p class="sin-resultados">No encontramos camisetas con esa búsqueda.</p>';
        return;
    }
    lista.forEach(producto => contenedor.appendChild(crearTarjeta(producto, camisetas.indexOf(producto), "camiseta")));
}

function mostrarShorts(lista) {
    if (!contenedorShorts) return;
    contenedorShorts.innerHTML = "";
    if (!lista.length) {
        contenedorShorts.innerHTML = '<p class="sin-resultados">No encontramos shorts con esa búsqueda.</p>';
        return;
    }
    lista.forEach(producto => contenedorShorts.appendChild(crearTarjeta(producto, shorts.indexOf(producto), "short")));
}

function abrirDetalle(indice, tipo = "camiseta") {
    productoSeleccionado = tipo === "short" ? shorts[indice] : camisetas[indice];
    if (!productoSeleccionado) return;
    talleSeleccionado = productoSeleccionado.talles[0] || "";
    document.getElementById("detalleImg").src = productoSeleccionado.imagen;
    document.getElementById("detalleImg").alt = productoSeleccionado.nombre;
    document.getElementById("detalleNombre").textContent = productoSeleccionado.nombre;
    document.getElementById("detallePrecio").textContent = formatoPrecio(productoSeleccionado.precio);
    document.getElementById("detalleCategoria").textContent = productoSeleccionado.categoria.toUpperCase();
    const talles = document.getElementById("detalleTalles");
    talles.innerHTML = "";
    productoSeleccionado.talles.forEach(talle => {
        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "talle-opcion" + (talle === talleSeleccionado ? " seleccionado" : "");
        boton.textContent = talle;
        boton.addEventListener("click", () => {
            talleSeleccionado = talle;
            talles.querySelectorAll("button").forEach(b => b.classList.toggle("seleccionado", b === boton));
        });
        talles.appendChild(boton);
    });
    document.getElementById("detalleWhatsApp").disabled = !talleSeleccionado;
    modal.classList.add("abierto");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-abierto");
}

function cerrarDetalle() {
    modal.classList.remove("abierto");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-abierto");
}

function manejarClickProducto(event) {
    const boton = event.target.closest("[data-producto]");
    if (boton) abrirDetalle(Number(boton.dataset.producto), boton.dataset.tipo || "camiseta");
}
contenedor.addEventListener("click", manejarClickProducto);
if (contenedorShorts) contenedorShorts.addEventListener("click", manejarClickProducto);

cerrarModal.addEventListener("click", cerrarDetalle);
modal.addEventListener("click", event => { if (event.target === modal) cerrarDetalle(); });
document.addEventListener("keydown", event => { if (event.key === "Escape") cerrarDetalle(); });

document.getElementById("detalleWhatsApp").addEventListener("click", () => {
    if (!productoSeleccionado || !talleSeleccionado) return;
    const precioMensaje = productoSeleccionado.precio == null ? "Quisiera consultar el precio" : `Precio publicado: ${formatoPrecio(productoSeleccionado.precio)}`;
    const mensaje = `¡Hola, La Popular! 👋 Quisiera consultar por ${productoSeleccionado.nombre}. Talle: ${talleSeleccionado}. ${precioMensaje}. ¿Está disponible?`;
    window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`, "_blank", "noopener,noreferrer");
});

// Búsqueda y filtros combinados
const buscador = document.getElementById("searchInput");
let categoriaActiva = "todos";
function actualizarCatalogo() {
    const texto = buscador.value.trim().toLocaleLowerCase("es");
    const filtradas = camisetas.filter(producto => {
        const coincideTexto = producto.nombre.toLocaleLowerCase("es").includes(texto);
        const coincideCategoria = categoriaActiva === "todos" || producto.categoria === categoriaActiva;
        return coincideTexto && coincideCategoria;
    });
    const shortsFiltrados = shorts.filter(producto => producto.nombre.toLocaleLowerCase("es").includes(texto));
    mostrarProductos(filtradas);
    mostrarShorts(shortsFiltrados);
}
buscador.addEventListener("input", actualizarCatalogo);
document.querySelectorAll(".categorias button").forEach(boton => {
    boton.addEventListener("click", () => {
        document.querySelectorAll(".categorias button").forEach(btn => btn.classList.remove("active"));
        boton.classList.add("active");
        categoriaActiva = boton.dataset.filter;
        actualizarCatalogo();
    });
});

const topBtn = document.getElementById("topBtn");
window.addEventListener("scroll", () => {
    topBtn.classList.toggle("visible", window.scrollY > 500);
});
topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

mostrarProductos(camisetas);
mostrarShorts(shorts);
