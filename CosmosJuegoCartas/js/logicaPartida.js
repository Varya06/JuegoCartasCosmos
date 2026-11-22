//Script que define la lógica de la partida, indicando cuando inicia y termina.
import { mazoInicialEstrellas, designarErrante, 
    cogerCarta,colocarSistemaSolar, colocarCartaCentral, destruirCartaSistema,
    destruirCartaErrante, entregarCarta, obtenerCarta } from "./accionesJugador.js";

import {interfazCartas, mostrarErrantes, mostrarSistemaSolar, mostrarCartaCentral}
from "./interfazCartas.js";

//Al iniciar la partida, se reinicia el contador de los turnos tambien
let turno = 0; 

const jugadores = [
    {
        nombre: "Jugador 1",
        cartas: [],
        sistemaSolar: [],
        errantes: [],
        cartaCentral: null,
        primeraVez: true,
        turno: true,
        cartaNueva: false,
        erranteColocada: false,
        cartaSistemaColocada: false,
        cartaCentralColocada: false,
        erranteDestruida: false
    },
    {
        nombre: "Jugador 2",
        cartas: [],
        sistemaSolar: [],
        errantes: [],
        primeraVez: true,
        cartaCentral: null,
        turno: false,
        cartaNueva: false,
        erranteColocada: false,
        cartaSistemaColocada: false,
        cartaCentralColocada: false,
        erranteDestruida: false
    }
];

function siguienteTurno(){
    //pasar al turno del siguiente jugador
    //mostrar las cartas del jugador en sus lugares correspondientes
    //reiniciar los booleanos para que pueda volver a realizar acciones 
    jugadores[0].turno = !jugadores[0].turno;
    jugadores[1].turno = !jugadores[1].turno;

    if (turno != 4){
        if (jugadores[0].turno){
            console.log("Turno del jugador 1");
            turno += 1; 
            console.log("Es el turno nº:", turno);

            if (jugadores[0].primeraVez){
                mazoInicialEstrellas(jugadores[0]);
                jugadores[0].primeraVez = false;
            }

            actualizarPantalla(jugadores[0]);
            
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

            if(jugadores[0].erranteDestruida){
                jugadores[0].erranteDestruida = false;
            }

        } else {
            console.log("Turno del jugador 2");
            turno += 1; 
            console.log("Es el turno nº:", turno);

            if (jugadores[1].primeraVez){
                mazoInicialEstrellas(jugadores[1]);
                jugadores[1].primeraVez = false;
            }

            actualizarPantalla(jugadores[1]);

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

            if (jugadores[1].erranteDestruida) {
                jugadores[1].erranteDestruida = false; 
            }
        }
    } else {
        finPartida(jugadores);
    }
    
}

//Mostrar las cartas del jugador correspondiente en el lugar donde las haya colocado
function actualizarPantalla(jugador){
    interfazCartas(jugador, 0);
    mostrarErrantes(jugador);
    mostrarSistemaSolar(jugador);
    mostrarCartaCentral(jugador);
}

function finPartida(jugadores){
    console.log("PARTIDA TERMINADA");

    //Se cambiará el texto de estos párrafos para mostrar la info de los resultados
    const [ganador, puntos1, puntos2] = obtenerGanador(jugadores);

    //Redirigirá a la página con todos los cambios ya aplicados 
    const url = `finPartida.html?ganador=${encodeURIComponent(ganador)}&puntos1=${puntos1}&puntos2=${puntos2}`;
    window.location.href = url;

}

function obtenerGanador(jugadores){
    let puntos = [0,0]; //un índice por jugador 
    let ganador = "";

    for (let i = 0; i<jugadores.length; i++){
        const sistemaSolar = jugadores[i].sistemaSolar;

        //Obtener el valor de cada carta de su sistema solar
        for (let j = 0; j<sistemaSolar.length; j++ ){
            const [carta, numeroOrbita] = sistemaSolar[j]; // Desempaquetar el par
            if (carta && typeof carta.puntos === "number") {
                puntos[i] += carta.puntos;
            }

        }
        
    }

    if (puntos[0] > puntos[1]){
        ganador = jugadores[0].nombre;
    } else {
        ganador = jugadores[1].nombre;
    }

    let puntos1 = puntos[0];
    let puntos2 = puntos[1];

    return [ganador, puntos1, puntos2];  
}

export{jugadores, siguienteTurno};