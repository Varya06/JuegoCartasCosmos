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

export { cartasJugadorEstrellas, cartasJugadorEstrellas2, cartas, mazoInicialEstrellas, interfazCartas };