logoGifos = document.getElementById("logo-gifos");
const comenzar = document.getElementById("btn-comenzar");
const cancelar = document.getElementById("btn-cancelar");
const volverHome = document.getElementById("arrow");
const cerrarEnChequeo = document.getElementById("dropdown-video");
const capturarVideo = document.getElementById("btn-capturar");
const pararVideo = document.getElementById("btn-listo");
const repetirCaptura = document.getElementById("btn-repetirCaptura");
const subirGuifo = document.getElementById("btn-subirGuifo");
const cancelarSubida = document.getElementById("btn-cancelar-subida");
const descargarGuifo = document.getElementById("btn-descargarGuifo");
const apiKey = "3oy9oqgtZ6bmMvxBi8v5gtR266qCfZl1";
const mis_guifos = "mis_guifos";
const copiarURL = document.getElementById("btn-enlaceGuifo");
const descargarGif = document.getElementById("btn-descargarGuifo");
const listoElGuifo = document.getElementById("btn-listo2");

if (localStorage.getItem("modoNoche") === "true") {
  document.body.classList.add("sailorNight");
  logoGifos.src = "..//assets/gifOF_logo_dark.png";
} else {
  document.body.classList.remove("sailorNight");
  logoGifos.src = "..//assets/gifOF_logo.png";
}

document.getElementById("ventana-capturar").style.display = "none";
document.getElementById("ventana-capturandoTuGuifo").style.display = "none";
document.getElementById("ventana-vistaPrevia").style.display = "none";
document.getElementById("subiendo-guifo").style.display = "none";
document.getElementById("ventana-GuifoExito").style.display = "none";

comenzar.addEventListener("click", async () => {
  await permisoCamara();
  document.getElementById("ventana-capturar").style.display = "flex";
  document.getElementById("ventana-capturandoTuGuifo").style.display = "none";
  document.getElementById("crearGifos").style.display = "none";
  document.getElementById("contenedor-misGuifos").style.display = "none";
});

capturarVideo.addEventListener("click", () => {
  recorder.startRecording();
  document.getElementById("video-captura").srcObject = videoRec;
  document.getElementById("ventana-capturandoTuGuifo").style.display = "flex";
  document.getElementById("ventana-capturar").style.display = "none";
});

cancelar.addEventListener("click", () => {
  history.back();
});

volverHome.addEventListener("click", () => {
  history.back();
});

cerrarEnChequeo.addEventListener("click", () => {
  document.getElementById("crearGifos").style.display = "flex";
});

pararVideo.addEventListener("click", previewCaptura);

var recorder;
var videoRec;

async function permisoCamara() {
  try {
    let mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    videoRec = mediaStream;
    recorder = RecordRTC(mediaStream, {
      type: "gif",
      quality: 10,
      frameRate: 1,
    });
    fotoDelPrimerCuadro();
  } catch (error) {
    alert(error);
    location.reload();
  }
}

function fotoDelPrimerCuadro() {
  document.getElementById("video").srcObject = videoRec;
}

function comienzoCaptura() {
  document.getElementById("ventana-capturar").style.display = "none";
}

function previewCaptura() {
  recorder.stopRecording();
  videoRec.stop();
  document.getElementById("ventana-capturandoTuGuifo").style.display = "none";
  document.getElementById("contenedor-misGuifos").style.display = "none";
  document.getElementById("ventana-capturar").style.display = "none";
  document.getElementById("ventana-vistaPrevia").style.display = "flex";
  document.getElementById("video-vistaPrevia").src = URL.createObjectURL(
    recorder.getBlob()
  );
}

repetirCaptura.addEventListener("click", repetirCapturaGuifo);

function repetirCapturaGuifo() {
  comienzoCaptura();
  document.getElementById("crearGifos").style.display = "flex";
  document.getElementById("ventana-vistaPrevia").style.display = "none";
}

subirGuifo.addEventListener("click", subirElGuifo);

async function subirElGuifo() {
  document.getElementById("ventana-vistaPrevia").style.display = "none";
  document.getElementById("subiendo-guifo").style.display = "flex";

  let form = new FormData();
  form.append("file", recorder.getBlob(), "file.gif");

  try {
    let subirGif = await fetch(
      `https://upload.giphy.com/v1/gifs?api_key=${apiKey}`,
      {
        method: "POST",
        body: form,
      }
    );
    let respuesta = await subirGif.json();
    let gifsCapturados = localStorage.getItem("mis_guifos");
    let guifos = [];
    if (gifsCapturados != null) {
      guifos = JSON.parse(gifsCapturados);
    }
    guifos.push(respuesta.data.id);
    localStorage.setItem("mis_guifos", JSON.stringify(guifos));
  } catch (error) {
    alert("error al subir el video");
  }
  subiendoGuifo();
}
cancelarSubida.addEventListener("click", () => {
  localStorage.removeItem("mis_guifos");
  location.reload();
});

function subiendoGuifo() {
  setTimeout(() => {
    document.getElementById("subiendo-guifo").style.display = "none";
  }, 100);
  guifoCreado();
}

function guifoCreado() {
  document.getElementById("guifo-ok").src = URL.createObjectURL(
    recorder.getBlob()
  );
  document.getElementById("crearGifos").style.display = "none";
  document.getElementById("ventana-capturar").style.display = "none";
  document.getElementById("ventana-capturandoTuGuifo").style.display = "none";
  document.getElementById("ventana-vistaPrevia").style.display = "none";
  document.getElementById("subiendo-guifo").style.display = "none";
  document.getElementById("ventana-GuifoExito").style.display = "flex";
  document.getElementById("contenedor-misGuifos").style.display = "block";
}

copiarURL.addEventListener("click", urlCopiada);

function urlCopiada() {
  alert("Enlace copiado con éxito!!");
}

descargarGif.addEventListener("click", guardarGuifoEnWeb);

listoElGuifo.addEventListener("click", () => {
  history.back();
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
