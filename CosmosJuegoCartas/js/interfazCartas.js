//PRUEBA CON SOLO CARTAS DE ESTRELLAS 

//IMPORTAR LAS CLASES DE LAS CARTAS 
import { cartasEstrella } from "./cartas.js";

//VARIABLES
const cartasJugadorEstrellas = [];
const cartasJugadorEstrellas2 = [];
const cartas = document.querySelectorAll(".imgCarta");


//Se forma un mazo incicial de 7 cartas de estrellas 
function mazoInicialEstrellas(jugador){
    for(let i = 0; i<7; i++){
        let num = Math.floor(Math.random() * 3);
        jugador.cartas.push(cartasEstrella[num]);
    }
}

//FALTA ARREGLAR ESTO
//TAL VEZ HACIENDO QUE SE RESETEE CADA VEZ QUE HAYA UN TURNO NUEVO, IGUAL QUE EN ERRANTES
function interfazCartas(jugador){
    for (let i = 0; i< cartas.length; i++){
        let carta = cartas[i];
        let cartaTipo = jugador.cartas[i].tipoEstrella;

        if (cartaTipo == "estrellaAzul") {
            carta.src = "../imagenes/carta_estrella_azul.png";

        } else if (cartaTipo == "estrellaRoja") {
            carta.src = "../imagenes/carta_estrella_roja.png";

        } else if (cartaTipo == "estrellaAmarilla") {
            carta.src = "../imagenes/carta_estrella_amarilla.png";
        }

    }
}

function actualizarErrantes(jugador){ 
    const errantes = document.querySelectorAll(".errante > .imgCarta"); 
    jugador.errantes = []; // Limpiar el array de errantes antes de actualizarlo 
    for (let i = 0; i < errantes.length; i++) { 
        let carta = errantes[i]; 
        jugador.errantes.push(carta.src); 
    } 
}

function mostrarErrantes(jugador) { 
    const contenedores = document.querySelectorAll(".errante"); 
    const errantesJugador = jugador.errantes; // Obtener el array de errantes del jugador 
    for (let i = 0; i < contenedores.length; i++) { 
        let contenedor = contenedores[i]; 
        contenedor.innerHTML = ""; // Limpiar el contenido del contenedor antes de agregar la carta 
    }

    for (let i = 0; i < errantesJugador.length; i++) { 
        if (i < contenedores.length) {

            // Crear una nueva imagen
            const carta = document.createElement("img");

            // Darle la clase que tienen tus cartas
            carta.classList.add("imgCarta");

            // Poner la imagen correspondiente
            carta.src = errantesJugador[i];

            // Meterla dentro del contenedor
            contenedores[i].appendChild(carta);
        }
    } 
}

export { cartasJugadorEstrellas, cartasJugadorEstrellas2, cartas, mazoInicialEstrellas, interfazCartas,
    actualizarErrantes, mostrarErrantes};