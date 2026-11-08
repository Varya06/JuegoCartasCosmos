//Elementos que se irán modificando
//Para que se puedan arrastrar todas las cartas
import { jugadores, colocarSistemaSolar, cogerCarta, designarErrante, colocarCartaCentral } from "./accionesJugador.js";
import { abrirMenuCombate} from "./elementosHtml.js";


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

//Para que se puedan soltar las cartas en los rectángulos de los errantes
const errantes = document.querySelectorAll(".errante");

errantes.forEach(errante => {
    errante.addEventListener("dragover", permitirSoltar);
    errante.addEventListener("drop", soltar);
});


//Para que se puedan soltar las cartas en cada espacio del sistema solar
const huecosSistema = document.querySelectorAll(".hueco-carta-sistema");

huecosSistema.forEach(hueco => {
    hueco.addEventListener("dragover", permitirSoltar);
    hueco.addEventListener("drop", soltar);
});


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
    console.log("Soltando en:", e.currentTarget.id);
    console.log("Datos transferidos:", e.dataTransfer.getData("posicion"));


    const jugadorActual = jugadores.find(
        jugador => jugador.turno
    );

    const jugadorSiguiente = jugadores.find(
        jugador => !jugador.turno
    );


    if (e.currentTarget.classList.contains("errante")) {
        const posicion = parseInt(
            e.dataTransfer.getData("posicion")
        );

        if (!jugadorActual.erranteColocada){
            designarErrante(jugadorActual, posicion);
            jugadorActual.erranteColocada = true;
        } else {
            alert("Solo puedes designar una errante en tu turno");
        }

    } else if (e.currentTarget.classList.contains("hueco-carta-sistema")) {

        const posicion = parseInt(
            e.dataTransfer.getData("posicion")
        );

        // Obtener el número de órbita del espacio seleccionado
        const orbita = parseInt(
            e.currentTarget.parentElement.dataset.orbita
        );

        console.log("Órbita seleccionada:", orbita);

        if (!jugadorActual.cartaSistemaColocada){

            // Comprobar que el espacio está vacío
            if (e.currentTarget.children.length === 0) {

                colocarSistemaSolar(jugadorActual, posicion, orbita);
                jugadorActual.cartaSistemaColocada = true;

            } else {
                alert("Esta órbita ya está ocupada");
            }

        } else {
            alert("Solo puedes colocar una carta en tu sistema solar durante tu turno");
        }

    } else if (e.currentTarget.id === "cartaCombate") {
        const posicion = parseInt(
            e.dataTransfer.getData("posicion")
        );

        if(!jugadorActual.cartaCentralColocada){
            const cartaCentral = colocarCartaCentral(jugadorActual,posicion);
            jugadorActual.cartaCentralColocada = true;
            console.log("La carta central es:",cartaCentral);

            //Se abre un menú para que el otro jugador elija una carta de su mazo 
            //para entregarla 
            abrirMenuCombate(jugadorSiguiente,cartaCentral);

        } else {
            alert("Solo puedes colocar una carta de combate en tu turno");
        }

    } else if (e.currentTarget.id === "filaCartas") {

        //Para que solo puedas coger una carta durante tu turno
        if (!jugadorActual.cartaNueva && jugadorActual.cartas.length < 14) {
            cogerCarta(jugadorActual);
        } else if (jugadorActual.cartaNueva) {
            alert("¡No puedes coger más de una carta en tu turno!");
        } else if (jugadorActual.cartas.length >= 14) {
            alert("¡No puedes tener más de 14 cartas en tu mano!");
        }

        jugadorActual.cartaNueva = true;
    }
}

