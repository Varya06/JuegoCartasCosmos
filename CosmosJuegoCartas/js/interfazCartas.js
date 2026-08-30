//PRUEBA CON SOLO CARTAS DE ESTRELLAS 

//IMPORTAR LAS CLASES DE LAS CARTAS 
import {mazoInicialEstrellas} from "./accionesJugador.js";

//VARIABLES
const cartasJugadorEstrellas = [];
const cartasJugadorEstrellas2 = [];
const cartas = document.querySelectorAll(".imgCarta");


//Función que muestras las cartas del jugador en la interfaz, actualizándolas en cada turno 
function interfazCartas(jugador){
    const contenedores = document.querySelectorAll(".carta");

    // Borrar lo que había antes
    contenedores.forEach(contenedor => {
        contenedor.innerHTML = "";
    });

    // Crear las cartas actuales del jugador
    for (let i = 0; i < jugador.cartas.length; i++) {

        if (i >= contenedores.length) {
            break;
        }

        const carta = document.createElement("img");

        carta.classList.add("imgCarta");
        carta.draggable = true;

        // guardar la posición que ocupa en jugador.cartas
        carta.dataset.posicion = i;

        carta.src = "../imagenes/" + jugador.cartas[i].tipoEstrella + ".png";

        contenedores[i].appendChild(carta);
    } 
}



function mostrarErrantes(jugador) {

    const contenedores = document.querySelectorAll(".errante");

    // Limpiar los huecos
    contenedores.forEach(contenedor => {
        contenedor.innerHTML = "";
    });

    // Crear las cartas errantes
    for (let i = 0; i < jugador.errantes.length; i++) {

        if (i >= contenedores.length) {
            break;
        }

        const carta = document.createElement("img");

        carta.classList.add("cartaErrante");

        carta.src = "../imagenes/" + jugador.errantes[i].tipoEstrella + ".png";

        contenedores[i].appendChild(carta);
    }
}

function mostrarSistemaSolar(jugador) {

    const contenedor = document.getElementById("imagen-sistemas");

    // Limpiar 
    contenedor.innerHTML = "<p>SISTEMA SOLAR</p>";

    // Crear las cartas del sistema solar
    for (let i = 0; i < jugador.sistemaSolar.length; i++) {

        const carta = document.createElement("img");

        carta.classList.add("cartaSistemaSolar");

        carta.src = "../imagenes/" + jugador.sistemaSolar[i].tipoEstrella + ".png";

        contenedor.appendChild(carta);
    }
}


export { cartasJugadorEstrellas, cartasJugadorEstrellas2, cartas, mazoInicialEstrellas, interfazCartas, mostrarErrantes, mostrarSistemaSolar};