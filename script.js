// =========================================
// CONFIGURACIÓN
// =========================================

const numeroWhatsApp = "5492645782637";

// =========================================
// CAMISETAS
// =========================================

const camisetas = [

    {
        nombre: "Barcelona Edicion Especial",
        categoria: "europa",
        imagen: "img/barcelonasuplente.png"
    },

    {
        nombre: "Chelsea T90",
        categoria: "europa",
        imagen: "img/chelseasuplente.jpg"
    },

    {
        nombre: "Argentina Titular 2026",
        categoria: "selecciones",
        imagen: "img/messi.jpg"
    },

    {
        nombre: "Argentina Suplente 2026",
        categoria: "selecciones",
        imagen: "img/argentinasuplente.jpg"
    },

    {
        nombre: "Manchester City Suplente 2026",
        categoria: "europa",
        imagen: "img/citynegra.jpg"
    },

    {
        nombre: "AC Milan 2026",
        categoria: "europa",
        imagen: "img/milan.jpg"
    },

    {
        nombre: "Corinthians Suplente 2025",
        categoria: "nacional",
        imagen: "img/depay.jpg"
    },

    {   nombre: "PSG Quinta 2026",
        categoria: "europa",
        imagen: "img/psgsuplente.jpg"
    },
    
    {   nombre: "Manchester City Titular 2026",
        categoria: "europa",
        imagen: "img/city2027.jpg"
    },

      {   nombre: "Brasil Titular 2026",
        categoria: "selecciones",
        imagen: "img/brasiltitular.jpg"
    },

      {   nombre: "Manchester United Titular 2026",
        categoria: "europa",
        imagen: "img/united2026.jpg"
    },

      {   nombre: "Liverpool Titular 2026",
        categoria: "europa",
        imagen: "img/liverpool.png"
    },

      {   nombre: "Palmeiras Suplente 2026",
        categoria: "nacional",
        imagen: "img/palmeiras.jpeg"
    },

      {   nombre: "Manchester City Titular 2026",
        categoria: "europa",
        imagen: "img/city2027.jpg"
    },

      {   nombre: "Barcelona Retro 2026",
        categoria: "europa",
        imagen: "img/fermin2.png"
    }  
];

// =========================================
// MOSTRAR PRODUCTOS
// =========================================

const contenedor = document.getElementById("contenedorProductos");

function mostrarProductos(lista){

    contenedor.innerHTML = "";

    lista.forEach(producto =>{

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `

            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img">

            <div class="info">

                <h3>${producto.nombre}</h3>

                <p>Calidad Premium</p>

                <button onclick="consultar('${producto.nombre}')">

                    CONSULTAR

                </button>

            </div>

        `;

        contenedor.appendChild(card);

    });

}

mostrarProductos(camisetas);

// =========================================
// WHATSAPP
// =========================================

function consultar(nombre){

    const mensaje = `Hola! 👋 Quisiera consultar por la camiseta ${nombre}.`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    window.open(url,"_blank");

}

// =========================================
// BUSCADOR
// =========================================

const buscador = document.getElementById("searchInput");

buscador.addEventListener("keyup",()=>{

    const texto = buscador.value.toLowerCase();

    const filtradas = camisetas.filter(camiseta=>

        camiseta.nombre.toLowerCase().includes(texto)

    );

    mostrarProductos(filtradas);

});

// =========================================
// FILTROS
// =========================================

const botones = document.querySelectorAll(".categorias button");

botones.forEach(boton=>{

    boton.addEventListener("click",()=>{

        botones.forEach(btn=>btn.classList.remove("active"));

        boton.classList.add("active");

        const categoria = boton.dataset.filter;

        if(categoria==="todos"){

            mostrarProductos(camisetas);

            return;

        }

        const filtradas = camisetas.filter(c=>

            c.categoria===categoria

        );

        mostrarProductos(filtradas);

    });

});

// =========================================
// BOTÓN SUBIR
// =========================================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        topBtn.style.display="flex";

    }else{

        topBtn.style.display="none";

    }

});

topBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

// =========================================
// MODAL IMAGEN
// =========================================

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const cerrar = document.querySelector(".cerrar");

document.addEventListener("click",(e)=>{

    if(e.target.classList.contains("producto-img")){

        modal.style.display="flex";

        modalImg.src = e.target.src;

    }

});

cerrar.onclick = ()=>{

    modal.style.display="none";

}

window.onclick = (e)=>{

    if(e.target===modal){

        modal.style.display="none";

    }

}
