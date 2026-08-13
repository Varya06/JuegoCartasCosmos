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

//EN VEZ DE VARIABLES SUELTAS, CREAR ARRAYS PARA CADA JUGADOR CON SUS PROPIAS CARTAS, SISTEMA SOLAR Y ERRANTES
const jugadores = [
    {
        cartas: [],
        sistemaSolar: [],
        errantes: [],
        primeraVez: true,
        turno: true
    },
    {
        cartas: [],
        sistemaSolar: [],
        errantes: [],
        primeraVez: true,
        turno: false
    }
];
mazoInicialEstrellas(jugadores[0]);
jugadores[0].primeraVez = false;
interfazCartas(jugadores[0]);


//IMPORTAR LAS CLASES DE LAS CARTAS 
import { cartas } from "./cartas.js";
import {cartasJugadorEstrellas, cartasJugadorEstrellas2, mazoInicialEstrellas, interfazCartas } from "./interfazCartas.js";

//console.log(cartas);

//Las cartas aleatorias con las que empieza al principio
function mazoInicial(jugador){
    for(let i = 0; i<7; i++){
        let num = Math.floor(Math.random() * 18);
        jugador.cartas.push(cartas[num]);
    }
}

function cogerCarta(jugador){
    let num = Math.floor(Math.random() * 18);
    let nuevaCarta = cartas[num];
    jugador.cartas.push(nuevaCarta);
}

function intercambiarCarta(jugador, posicion){
    //delete jugador.cartas[posicion];
    let num = Math.floor(Math.random() * 18);
    let nuevaCarta = cartas[num];
    jugador.cartas.splice(posicion,1,nuevaCarta);
    //jugador.cartas[posicion] = nuevaCarta;
}

//Funcion que coloca una carta en el sistema solar 
function colocarCarta(jugador, cartasSistemaSolar, posicion){
    cartasSistemaSolar.push(jugador.cartas[posicion]);
    jugador.cartas.splice(posicion,1);
}

//Funcion que establece una carta como cuerpo celeste errante 
//para atacar el sistema solar del otro jugador 
function designarErrante(jugador, cartasErrantes, posicion){
    cartasErrantes.push(jugador.cartas[posicion]);
    jugador.cartas.splice(posicion,1);
}

function siguienteTurno(){
    //pasar al turno del siguiente jugador
    jugadores[0].turno = !jugadores[0].turno;
    jugadores[1].turno = !jugadores[1].turno;
    if (jugadores[0].turno){
        console.log("Turno del jugador 1");
        if (jugadores[0].primeraVez){
            mazoInicialEstrellas(jugadores[0]);
            jugadores[0].primeraVez = false;
        }
        interfazCartas(jugadores[0]);
    } else {
        console.log("Turno del jugador 2");
        if (jugadores[1].primeraVez){
            mazoInicialEstrellas(jugadores[1]);
            jugadores[1].primeraVez = false;
        }
        interfazCartas(jugadores[1]);
    }
}

//EXPORTAR LA FUNCION DE PASAR TURNO PARA INCLUIRLO EN ELEMENTOSHTML.JS
export {siguienteTurno};

//PRUEBA DE FUNCIONAMIENTO

console.log("Cartas del jugador iniciales:")
mazoInicial(jugadores[0]);
for (const carta of jugadores[0].cartas){
    console.log(carta.tipo);
}


cogerCarta(jugadores[0]);
console.log("Cartas del jugador actuales:")
for (const carta of jugadores[0].cartas){
    console.log(carta.tipo);
}

cogerCarta(jugadores[1]);
console.log("Cartas del jugador actuales:")
for (const carta of jugadores[1].cartas){
    console.log(carta.tipo);
}

intercambiarCarta(jugadores[0], 1);
console.log("Cartas del jugador actuales:")
for (const carta of jugadores[0].cartas){
    console.log(carta.tipo);
}

//Prueba de colocar una carta en el sistema solar 
colocarCarta(jugadores[0], cartasSistemaSolar, 1);
console.log("Cartas del jugador actuales:")
for (const carta of jugadores[0].cartas){
    console.log(carta.tipo);
}

console.log("Cartas del sistema solar:")
for (const carta of cartasSistemaSolar){
    console.log(carta.tipo);
}

//Prueba de coger una carta y después designarla como cuerpo celeste errante 
cogerCarta(jugadores[0]);
console.log("Cartas del jugador actuales:")
for (const carta of jugadores[0].cartas){
    console.log(carta.tipo);
}

designarErrante(jugadores[0], cartasErrantes, 0);
console.log("Cuerpos celestes errantes:")
for (const carta of cartasErrantes){
    console.log(carta.tipo);
}

console.log("Cartas del jugador actuales:")
for (const carta of jugadores[0].cartas){
    console.log(carta.tipo);
}


//Llamar a la función de siguiente turno con el botón de la interfaz
const boton = document.getElementById("botonSiguienteTurno");

boton.addEventListener("click", siguienteTurno);
