document.getElementById("contenedor-misGuifos").style.display = "none";

const apiKey = "3oy9oqgtZ6bmMvxBi8v5gtR266qCfZl1";
const linkMisGuifos = document.getElementById("misGuifos");
const urlGifSugerencia =
  "https://api.giphy.com/v1/gifs/trending?api_key=3oy9oqgtZ6bmMvxBi8v5gtR266qCfZl1&limit=4&rating=G";
const urlGifTendencias =
  "https://api.giphy.com/v1/gifs/search?api_key=3oy9oqgtZ6bmMvxBi8v5gtR266qCfZl1&q=fail&limit=10&offset=0&rating=PG&lang=en";
const contenedorDeTendencias = document.querySelector(".contenedor-tendencias");
const selectorEstilo = document.getElementById("btn-flecha");
const botonBuscar = document.getElementById("btn-buscar");
const contenedorDeBusquedas = document.getElementById(
  "contenedor-busquedaGuifos"
);
const busquedaInput = document.getElementById("input-buscar");
const imagenLupa = document.getElementById("lupa");
const menuOpciones = document.getElementById("menu-desplegable-items");
const modoNoche = document.getElementById("btn-sailorNight");
const modoDia = document.getElementById("btn-sailorDay");
const logoGifos = document.getElementById("logo-gifos");

// CAMBIO de ESTILOS//////////////////////////////////////

selectorEstilo.addEventListener("mouseover", () => {
  document.getElementById("btn-estilos").style.display = "flex";
});

selectorEstilo.addEventListener("mouseleave", () => {
  document.getElementById("btn-estilos").style.display = "none";
});

linkMisGuifos.addEventListener("click", paginaMisGuifos);
function paginaMisGuifos() {
  document.getElementById("menu-desplegable").style.display = "none";
  document.getElementById("sugerencias").style.display = "none";
  document.getElementById("tendencias").style.display = "none";
  document.getElementById("contenedor-misGuifos").style.display = "block";
  document.getElementById("nav-bar").style.display = "none";
}

async function obtenerGuifosSugerencias() {
  let respuesta = await fetch(urlGifSugerencia);

  let datosGifs = await respuesta.json();

  return datosGifs;
}

obtenerGuifosSugerencias().then((resultado) => {
  var contenedor = "";
  for (let i = 0; i < resultado.data.length; i++) {
    const element = resultado.data[i];
    contenedor += `<div class="gif_flex"><img src="assets/close.svg" class="dropdown">
        <p class="titulo-gif">#${element.title}</p>
        <img src="${element.images.original.url}" alt="gif" class=gif_square_item>
        <a href="https://giphy.com" target="_blank" class="btn_ver_mas">Ver más...</a>
        </div>`;
  }

  var contenedorSugerencias = document.querySelector(".sugerencia_gif_item");
  contenedorSugerencias.innerHTML = contenedor;
});

async function obtenerGuifosTendencias() {
  let respuesta = await fetch(urlGifTendencias);
  let datosGifs = await respuesta.json();
  return datosGifs;
}

obtenerGuifosTendencias().then((r) => {
  for (let i = 0; i < r.data.length; i++) {
    const element = r.data[i];

    let nuevoDiv = document.createElement("div");
    nuevoDiv.setAttribute("class", "gif-flex");

    let imagenGif = document.createElement("img");
    imagenGif.setAttribute("src", element.images.original.url);
    imagenGif.className = "gif_square_item";

    let tituloGif = document.createElement("p");
    tituloGif.className = "tendencia_subtitulo_hoover";
    tituloGif.innerText = "#" + element.title;

    nuevoDiv.appendChild(imagenGif);
    nuevoDiv.appendChild(tituloGif);

    contenedorDeTendencias.appendChild(nuevoDiv);

    if (i == 4 || i == 9) {
      imagenGif.className = imagenGif.className.replace =
        ("gif_square_item", "img-rectangular");
    }
  }
});

async function busquedaGifos() {
  let busqueda = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=3oy9oqgtZ6bmMvxBi8v5gtR266qCfZl1&q=${busquedaInput.value}&limit=10&offset=0&rating=G&lang=en`
  );
  let resultado = await busqueda.json();

  if (busquedaInput == "") {
    alert("no se ha encontrado la búsqueda");
    return;
  }
  let contenedorBusqueda = document.getElementById("contenedor-busquedaGuifos");
  contenedorBusqueda.innerHTML = "";
  for (let i = 0; i < resultado.data.length; i++) {
    const element = resultado.data[i];

    let nuevoDiv = document.createElement("div");
    nuevoDiv.setAttribute("class", "busqueda-item");

    let imagenGif = document.createElement("img");
    imagenGif.style.backgroundImage =
      "url(" + element.images.original.url + ")";
    imagenGif.className = "gif_square_item";

    nuevoDiv.appendChild(imagenGif);

    contenedorBusqueda.appendChild(nuevoDiv);

    if (i == 4 || i == 9) {
      imagenGif.className = imagenGif.className.replace =
        ("gif_square_item", "img-rectangular");
    }
  }

  document.getElementById("sugerencias").style.display = "none";
  document.getElementById("tendencias").style.display = "none";
  document.getElementById("tags-busqueda").style.display = "flex";
  document.getElementById("titulo-busquedaGuifos").style.display = "flex";
}

function tagsSugeridos() {
  fetch(
    `https://api.giphy.com/v1/gifs/search/tags?api_key=3oy9oqgtZ6bmMvxBi8v5gtR266qCfZl1&q=${busquedaInput.value}`
  )
    .then((respuesta) => {
      return respuesta.json();
    })
    .then((r) => {
      console.log(r);
      let input = "";
      for (let i = 0; i < 3; i++) {
        const element = r.data[i];
        input += `<div class="input-item">
        <div class="input-resultado"><span class="result" id="result1"> ${element.name} </span></div>
        </div>`;
      }
      let contenedorTags = document.getElementById("menu-desplegable-items");
      contenedorTags.innerHTML = input;
    });
}

botonBuscar.addEventListener("click", () => {
  let ingresoBusqueda = busquedaInput.value;
  document.getElementById(
    "span-resultados"
  ).innerHTML = `Resultados: ${ingresoBusqueda}`;
  busquedaGifos(ingresoBusqueda);
});

busquedaInput.addEventListener("input", () => {
  let ingresoBusqueda = busquedaInput.value;
  tagsSugeridos(ingresoBusqueda);
  if (ingresoBusqueda != "") {
    menuOpciones.style.display = "flex";
    busquedaInput.classList.toggle("focus");
    botonBuscar.classList.add("active");
    imagenLupa.src = "assets/lupa.svg";
  } else {
    menuOpciones.style.display = "none";
    botonBuscar.classList.remove("active");
  }
});

menuOpciones.addEventListener("mouseleave", limpiarBusqueda);

function limpiarBusqueda() {
  menuOpciones.style.display = "none";
}

document.getElementById("logo-gifos").addEventListener("click", () => {
  location.reload();
});

/// CAMBIO DE ESTILOS

modoNoche.addEventListener("click", () => {
  document.body.classList.add("sailorNight");
  localStorage.setItem("modoNoche", "true");
  logoGifos.src = "assets/gifOF_logo_dark.png";
});

if (localStorage.getItem("modoNoche") === "true") {
  document.body.classList.add("sailorNight");
  logoGifos.src = "assets/gifOF_logo_dark.png";
} else {
  document.body.classList.remove("sailorNight");
  logoGifos.src = "assets/gifOF_logo.png";
}

modoDia.addEventListener("click", () => {
  document.body.classList.remove("sailorNight");
  localStorage.setItem("modoNoche", "false");
  logoGifos.src = "assets/gifOF_logo.png";
});

const contenedorMisGifs = document.getElementById("contenedor-gif");
function mostrarGuifoEnWeb(url) {
  let nuevoDiv = document.createElement("div");
  nuevoDiv.setAttribute("class", "misGuifos-item");
  let imgGif = document.createElement("img");
  imgGif.setAttribute("src", `${url}`);
  nuevoDiv.appendChild(imgGif);
  contenedorMisGifs.appendChild(nuevoDiv);
}

async function guardarGuifoEnWeb() {
  let gif = localStorage.getItem("mis_guifos");
  let idGif = JSON.parse(gif);

  let guifosDelLocalViejos = document.querySelectorAll(".misGuifos-item");
  guifosDelLocalViejos.forEach((item) => {
    item.remove();
  });

  for (let i = 0; i < idGif.length; i++) {
    let downloadGif = await fetch(
      `https://api.giphy.com/v1/gifs/${idGif[i]}?api_key=${apiKey}`
    );
    let respuesta = await downloadGif.json();

    let urlGif = respuesta.data.images.original.url;

    mostrarGuifoEnWeb(urlGif);
  }
}
guardarGuifoEnWeb();
