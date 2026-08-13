//Elementos que se irán modificando
//Para que se puedan arrastrar todas las cartas
const cartas = document.querySelectorAll(".imgCarta");

cartas.forEach(carta => {
    carta.addEventListener("dragstart", arrastrar);
});

//Para que se puedan designar como errantes 
const errantes = document.querySelectorAll(".errante");

errantes.forEach(errante => {
    errante.addEventListener("dragover", permitirSoltar);
    errante.addEventListener("drop", soltar);
});

const sistemaSolar = document.getElementById("imagen-sistemas");

sistemaSolar.addEventListener("dragover", permitirSoltar);
sistemaSolar.addEventListener("drop", soltar);

const cartaCentral = document.getElementById("cartaCombate");

cartaCentral.addEventListener("dragover", permitirSoltar);
cartaCentral.addEventListener("drop", soltar);



//FUNCIÓN PARA PODER SOLTAR LA CARTA EN EL RECTANGULO AL PASAR ENCIMA
function permitirSoltar(e){
    e.preventDefault();
}

//FUNCIÓN PARA PODER MOVER LA CARTA 
function arrastrar(e){
    e.dataTransfer.setData("info",e.target.id);
}

//FUNCION PARA PERMITIR SOLTAR Y QUE LA CARTA SE QUEDE EN EL RECTANGULO
function soltar(e){
    e.preventDefault();

    const id = e.dataTransfer.getData("info");
    const carta = document.getElementById(id);

    e.currentTarget.appendChild(carta);

}

