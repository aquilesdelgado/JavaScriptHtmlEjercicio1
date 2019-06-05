let botonFrame = document.querySelector("#capturarFotograma");
let botonBlackWhite = document.querySelector("#filtroGris");
let botonLigth = document.querySelector("#filtroLigthern");
let botonclear = document.querySelector("#filtroclear");
const video1 = document.querySelector("#video1");
const canvas = document.querySelector("canvas");
//obtener el contexto del canvas para poder asignarle luego la imagen
let context = canvas.getContext("2d");
// declaro variables para el ancho y alto que luego voy a cargar con los del video
let w, h, r;
let fotograma;

//Doy eventos a mis botones
botonFrame.addEventListener("click",freezeFrame, false);
video1.addEventListener("loadedmetadata", videoProperties,false);
botonclear.addEventListener("click",clear,false);
botonBlackWhite.addEventListener("click",blackWhite,false);

// hago mis funciones para cada boton
function videoProperties() {
    // r = video1.width/video1.height;
    w = video1.width;
    h = video1.height;
    // console.log(w,h);
};

function freezeFrame () {

    // context.fillRect(0,0,w,h);
   fotograma = context.drawImage(video1,0,0,w,h);
};


function clear(){

    context.clearRect(0,0,w,h);
};

function blackWhite() {
    let fotogramaData = context.getImageData(0,0,canvas.width,canvas.height);
    let pixelarray = fotogramaData.data;
    let pixelestotal = pixelarray.length;

    // recorremos el array para sacar un average de rgb
    for (let i=0;i<pixelestotal;i = i+4) {
        let r = pixelarray[i];
        let g = pixelarray[i+1];
        let b = pixelarray[i+2];

        // promediamos los datos de rgb y lo dividimos entre la cantidad de parametro
        let average = (r+g+b)/3;
        // aplicamos el average a los pixeles
        pixelarray[i] = average;
        pixelarray[i+1] = average;
        pixelarray[i+2] = average;
    }
    context.putImageData(fotogramaData,0,0);
    console.log(pixelarray.length);
    return;

}

