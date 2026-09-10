//Elementos que se irán modificando
//Para que se puedan arrastrar todas las cartas
import { jugadores, colocarSistemaSolar, designarErrante, colocarCartaCentral } from "./accionesJugador.js";

const filaCartas = document.getElementById("filaCartas");

filaCartas.addEventListener("dragstart", arrastrar);

const baraja = document.getElementById("baraja");

baraja.addEventListener("dragstart", arrastrar);

//Para que se puedan soltar las cartas en los rectángulos de los errantes y del sistema solar
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
function arrastrar(e) {

    const posicion = e.target.dataset.posicion;

    e.dataTransfer.setData("posicion", posicion);
}

//FUNCION PARA PERMITIR SOLTAR Y QUE LA CARTA SE QUEDE EN EL RECTANGULO
function soltar(e) {

    e.preventDefault();

    const posicion = parseInt(
        e.dataTransfer.getData("posicion")
    );

    const jugadorActual = jugadores.find(
        jugador => jugador.turno
    );

    if (e.currentTarget.classList.contains("errante")) {

        designarErrante(jugadorActual, posicion);
    } else if (e.currentTarget.id === "imagen-sistemas") {
        colocarSistemaSolar(jugadorActual, posicion);
    } else if (e.currentTarget.id === "cartaCombate") {
        colocarCartaCentral(jugadorActual, posicion);
    }
}

