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
        cartaCentral: null,
        primeraVez: true,
        turno: true,
        cartaNueva: false,
        erranteColocada: false,
        cartaSistemaColocada: false,
        cartaCentralColocada: false
    },
    {
        cartas: [],
        sistemaSolar: [],
        errantes: [],
        primeraVez: true,
        cartaCentral: null,
        turno: false,
        cartaNueva: false,
        erranteColocada: false,
        cartaSistemaColocada: false,
        cartaCentralColocada: false
    }
];

//Lo que se muestra al inicio de la partida
mazoInicialEstrellas(jugadores[0]);
jugadores[0].primeraVez = false;
interfazCartas(jugadores[0]);


//IMPORTAR LAS CLASES DE LAS CARTAS 
import { cartas, cartasEstrella } from "./cartas.js";
import {cartasJugadorEstrellas, cartasJugadorEstrellas2, interfazCartas, mostrarErrantes, 
    mostrarSistemaSolar, mostrarCartaCentral} from "./interfazCartas.js";

//console.log(cartas);

//Las cartas aleatorias con las que empieza al principio
function mazoInicial(jugador){
    for(let i = 0; i<7; i++){
        let num = Math.floor(Math.random() * 18);
        jugador.cartas.push(cartas[num]);
    }
}

//Se forma un mazo incicial de 7 cartas de estrellas 
function mazoInicialEstrellas(jugador){
    for(let i = 0; i<7; i++){
        let num = Math.floor(Math.random() * 3);
        jugador.cartas.push(cartasEstrella[num]);
    }
}

function cogerCarta(jugador){
    let num = Math.floor(Math.random() * 3);
    let nuevaCarta = cartasEstrella[num];
    console.log("Carta cogida: " + nuevaCarta.tipoEstrella);
    alert("Carta cogida: " + nuevaCarta.tipoEstrella);
    jugador.cartas.push(nuevaCarta);
    interfazCartas(jugador, 0);
}

function intercambiarCarta(jugador, posicion){
    //delete jugador.cartas[posicion];
    let num = Math.floor(Math.random() * 18);
    let nuevaCarta = cartas[num];
    jugador.cartas.splice(posicion,1,nuevaCarta);
    //jugador.cartas[posicion] = nuevaCarta;
}


// Funcion que establece una carta como parte del sistema Solar
function colocarSistemaSolar(jugador, posicion){
    const carta = jugador.cartas[posicion];

    if (!carta) {
        return;
    }

    // Quitar de la mano
    jugador.cartas.splice(posicion, 1);

    // Guardar el objeto carta
    jugador.sistemaSolar.push(carta);

    // Actualizar pantalla
    interfazCartas(jugador, 0);
    mostrarSistemaSolar(jugador);
}

//Funcion que establece una carta como cuerpo celeste errante 
//para atacar el sistema solar del otro jugador 
function designarErrante(jugador, posicion) {

    const carta = jugador.cartas[posicion];

    if (!carta) {
        return;
    }

    // Quitar de la mano
    jugador.cartas.splice(posicion, 1);

    // Guardar el objeto carta
    jugador.errantes.push(carta);

    // Actualizar pantalla
    interfazCartas(jugador, 0);
    mostrarErrantes(jugador);
}

//Funcion para colocar una carta del mazo en el centro, para que los otros jugadores tengan que poner
//cartas menores a esa
function colocarCartaCentral(jugador, posicion){
    const carta = jugador.cartas[posicion];

    if (!carta) {
        return;
    }

    // Quitar de la mano
    jugador.cartas.splice(posicion, 1);

    // Guardar el objeto carta
    jugador.cartaCentral = carta;

    // Actualizar pantalla
    interfazCartas(jugador, 0);
    mostrarCartaCentral(jugador);
}

//Funcion para destruir una carta del sistema solar del otro jugador 
function destruirCartaSistema(jugador,posicion){
    const carta = jugador.sistemaSolar[posicion];

    //Eliminarla de la lista de cartas del sistema solar
    jugador.sistemaSolar.splice(posicion,1);

    //Actualizar pantalla
    mostrarSistemaSolar(jugador);
}

//Funcion para destruir una carta errante despues de haber sido usada
function destruirCartaErrante(jugador,posicion){
    const carta = jugador.errantes[posicion];

    //Eliminarla de la lista de cartas errantes 
    jugador.errantes.splice(posicion,1);

    //Actualizar pantalla
    mostrarErrantes(jugador);
}


function siguienteTurno(){
    //pasar al turno del siguiente jugador
    //mostrar las cartas del jugador en sus lugares correspondientes
    //reiniciar los booleanos para que pueda volver a realizar acciones 
    jugadores[0].turno = !jugadores[0].turno;
    jugadores[1].turno = !jugadores[1].turno;
    if (jugadores[0].turno){
        console.log("Turno del jugador 1");
        if (jugadores[0].primeraVez){
            mazoInicialEstrellas(jugadores[0]);
            jugadores[0].primeraVez = false;
        }
        interfazCartas(jugadores[0], 0);
        mostrarErrantes(jugadores[0]);
        mostrarSistemaSolar(jugadores[0]);
        mostrarCartaCentral(jugadores[0]);

        if (jugadores[0].cartaNueva) {
            jugadores[0].cartaNueva = false; // Resetearlo para que pueda volver a coger una carta
        }

        if(jugadores[0].erranteColocada){
            jugadores[0].erranteColocada = false;
        }

        if(jugadores[0].cartaSistemaColocada){
            jugadores[0].cartaSistemaColocada = false;
        }

        if(jugadores[0].cartaCentralColocada){
            jugadores[0].cartaCentralColocada = false;
        }

    } else {
        console.log("Turno del jugador 2");
        if (jugadores[1].primeraVez){
            mazoInicialEstrellas(jugadores[1]);
            jugadores[1].primeraVez = false;
        }
        interfazCartas(jugadores[1], 0);
        mostrarErrantes(jugadores[1]);
        mostrarSistemaSolar(jugadores[1]);
        mostrarCartaCentral(jugadores[1]);

        if (jugadores[1].cartaNueva) {
            jugadores[1].cartaNueva = false; 
        }

        if (jugadores[1].erranteColocada) {
            jugadores[1].erranteColocada = false; 
        }

        if (jugadores[1].cartaSistemaColocada) {
            jugadores[1].cartaSistemaColocada = false; 
        }

        if (jugadores[1].cartaCentralColocada) {
            jugadores[1].cartaCentralColocada = false; 
        }
    }
}

//EXPORTAR LA FUNCION DE PASAR TURNO PARA INCLUIRLO EN ELEMENTOSHTML.JS
export {mazoInicialEstrellas, siguienteTurno, designarErrante, 
    cogerCarta,colocarSistemaSolar, colocarCartaCentral, destruirCartaSistema,
    destruirCartaErrante, jugadores};




//Llamar a la función de siguiente turno con el botón de la interfaz
const boton = document.getElementById("botonSiguienteTurno");

boton.addEventListener("click", siguienteTurno);
