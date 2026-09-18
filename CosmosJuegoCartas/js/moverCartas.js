//Elementos que se irán modificando
//Para que se puedan arrastrar todas las cartas
import { jugadores, colocarSistemaSolar, cogerCarta, designarErrante, colocarCartaCentral } from "./accionesJugador.js";

const filaCartas = document.getElementById("filaCartas");

filaCartas.addEventListener("dragstart", arrastrar);
filaCartas.addEventListener("dragover", permitirSoltar);
filaCartas.addEventListener("drop", soltar);

const baraja = document.getElementById("baraja");

baraja.addEventListener("dragstart", arrastrar);

const cartasBaraja = baraja.querySelectorAll(".carta");
cartasBaraja.forEach(carta => {
    carta.setAttribute("draggable", "true");
});

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
    //Comprobar en la consola
    console.log("Soltando en:", e.currentTarget.id); // Verifica dónde se suelta
    console.log("Datos transferidos:", e.dataTransfer.getData("posicion"));


    const jugadorActual = jugadores.find(
        jugador => jugador.turno
    );

    if (e.currentTarget.classList.contains("errante")) {
        const posicion = parseInt(
        e.dataTransfer.getData("posicion")
        );

        designarErrante(jugadorActual, posicion);
    } else if (e.currentTarget.id === "imagen-sistemas") {
        const posicion = parseInt(
        e.dataTransfer.getData("posicion")
        );
        colocarSistemaSolar(jugadorActual, posicion);
    } else if (e.currentTarget.id === "cartaCombate") {
        const posicion = parseInt(
        e.dataTransfer.getData("posicion")
        );
        colocarCartaCentral(jugadorActual, posicion);
    } else if (e.currentTarget.id === "filaCartas") {
        //Para que solo puedas coger una carta durante tu turno
        if (!jugadorActual.cartaNueva && jugadorActual.cartas.length < 14) {
            cogerCarta(jugadorActual);
        } else if (jugadorActual.cartaNueva) {
            alert("¡No puedes coger más de una carta en tu turno!");
        } else if (jugadorActual.cartas.length >= 14) {
            alert("¡No puedes tener más de 14 cartas en tu mano!");
        }
        jugadorActual.cartaNueva = true; // Marcar que el jugador ha cogido una carta nueva
    }
}

