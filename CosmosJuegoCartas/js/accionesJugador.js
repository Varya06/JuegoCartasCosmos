
//INICIALIZACIÓN DE VARIABLES
const cartasJugador = []; //las cartas que tiene el jugador en su mazo
const cartasJugador2 = []; //las cartas que tiene el jugador en su mazo
const cartasSistemaSolar = []; //las cartas que tiene el jugador en su sistema solar 
const cartasErrantes = []; //cartas del jugador que son cuerpos celestes errantes
const cartasSistemaSolar2 = []; //las cartas que tiene el jugador en su sistema solar 
const cartasErrantes2 = []; //cartas del jugador que son cuerpos celestes errantes
var contadorCartas = 0;
var contadorSistemaSolar = 0;
var contadorErrantes = 0;
var turnoJugador1 = true; //variable que indica si es el turno del jugador 1 o del jugador 2
var turnoJugador2 = false; //variable que indica si es el turno del jugador 1 o del jugador 2
var primeraVezJugador1 = true; //variable que indica si es la primera vez que el jugador 1 juega
var primeraVezJugador2 = true; //variable que indica si es la primera vez que el jugador 2 juega

//EN VEZ DE VARIABLES, CREAR OBJETOS PARA CADA JUGADOR CON SUS PROPIAS CARTAS, SISTEMA SOLAR Y ERRANTES


//IMPORTAR LAS CLASES DE LAS CARTAS 
import { cartas } from "./cartas.js";
import {cartasJugadorEstrellas, cartasJugadorEstrellas2, mazoInicialEstrellas, interfazCartas } from "./interfazCartas.js";

//console.log(cartas);

//Las cartas aleatorias con las que empieza al principio
function mazoInicial(cartasJugador){
    for(let i = 0; i<7; i++){
        let num = Math.floor(Math.random() * 18);
        cartasJugador[i] = cartas[num];
    }
}

function cogerCarta(cartasJugador){
    let num = Math.floor(Math.random() * 18);
    let nuevaCarta = cartas[num];
    cartasJugador.push(nuevaCarta);
}

function intercambiarCarta(cartasJugador, posicion){
    //delete cartasJugador[posicion];
    let num = Math.floor(Math.random() * 18);
    let nuevaCarta = cartas[num];
    cartasJugador.splice(posicion,1,nuevaCarta);
    //cartasJugador[posicion] = nuevaCarta;
}

//Funcion que coloca una carta en el sistema solar 
function colocarCarta(cartasJugador, cartasSistemaSolar, posicion){
    cartasSistemaSolar.push(cartasJugador[posicion]);
    cartasJugador.splice(posicion,1);
}

//Funcion que establece una carta como cuerpo celeste errante 
//para atacar el sistema solar del otro jugador 
function designarErrante(cartasJugador, cartasErrantes, posicion){
    cartasErrantes.push(cartasJugador[posicion]);
    cartasJugador.splice(posicion,1);
}

function siguienteTurno(){
    //pasar al turno del siguiente jugador
    turnoJugador1 = !turnoJugador1;
    turnoJugador2 = !turnoJugador2;
    if (turnoJugador1){
        console.log("Turno del jugador 1");
        if (primeraVezJugador1){
            mazoInicialEstrellas(cartasJugadorEstrellas);
            primeraVezJugador1 = false;
        }
        interfazCartas(cartasJugadorEstrellas);
    } else {
        console.log("Turno del jugador 2");
        if (primeraVezJugador2){
            mazoInicialEstrellas(cartasJugadorEstrellas2);
            primeraVezJugador2 = false;
        }
        interfazCartas(cartasJugadorEstrellas2);
    }
}

//EXPORTAR LA FUNCION DE PASAR TURNO PARA INCLUIRLO EN ELEMENTOSHTML.JS
export {siguienteTurno};

//PRUEBA DE FUNCIONAMIENTO

console.log("Cartas del jugador iniciales:")
mazoInicial(cartasJugador);
for (const carta of cartasJugador){
    console.log(carta.tipo);
}


cogerCarta(cartasJugador);
console.log("Cartas del jugador actuales:")
for (const carta of cartasJugador){
    console.log(carta.tipo);
}

cogerCarta(cartasJugador);
console.log("Cartas del jugador actuales:")
for (const carta of cartasJugador){
    console.log(carta.tipo);
}

intercambiarCarta(cartasJugador, 1);
console.log("Cartas del jugador actuales:")
for (const carta of cartasJugador){
    console.log(carta.tipo);
}

//Prueba de colocar una carta en el sistema solar 
colocarCarta(cartasJugador, cartasSistemaSolar, 1);
console.log("Cartas del jugador actuales:")
for (const carta of cartasJugador){
    console.log(carta.tipo);
}

console.log("Cartas del sistema solar:")
for (const carta of cartasSistemaSolar){
    console.log(carta.tipo);
}

//Prueba de coger una carta y después designarla como cuerpo celeste errante 
cogerCarta(cartasJugador);
console.log("Cartas del jugador actuales:")
for (const carta of cartasJugador){
    console.log(carta.tipo);
}

designarErrante(cartasJugador, cartasErrantes, 0);
console.log("Cuerpos celestes errantes:")
for (const carta of cartasErrantes){
    console.log(carta.tipo);
}

console.log("Cartas del jugador actuales:")
for (const carta of cartasJugador){
    console.log(carta.tipo);
}


//Llamar a la función de siguiente turno con el botón de la interfaz
const boton = document.getElementById("botonSiguienteTurno");

boton.addEventListener("click", siguienteTurno);