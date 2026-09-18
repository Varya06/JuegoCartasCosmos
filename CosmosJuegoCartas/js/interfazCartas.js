//PRUEBA CON SOLO CARTAS DE ESTRELLAS 

//IMPORTAR LAS CLASES DE LAS CARTAS 
import {mazoInicialEstrellas} from "./accionesJugador.js";

//VARIABLES
const cartasJugadorEstrellas = [];
const cartasJugadorEstrellas2 = [];
const cartas = document.querySelectorAll(".imgCarta");


//Función que muestras las cartas del jugador en la interfaz, actualizándolas en cada turno 
function interfazCartas(jugador, inicio = 0){
    const contenedores = document.querySelectorAll(".carta");
    const cartasMostradas = 7; // Número de cartas que se muestran inicialmente

    // Borrar lo que había antes
    contenedores.forEach(contenedor => {
        contenedor.innerHTML = "";
    });

     // Crear las cartas actuales del jugador
    for (let i = inicio; i < jugador.cartas.length && i < inicio + cartasMostradas; i++) {
        const indiceContenedor = i - inicio; // Calcular el índice del contenedor correspondiente

        if (indiceContenedor >= contenedores.length) {
            break; // Salir del bucle si no hay más contenedores disponibles
        }

        const carta = document.createElement("img");
        carta.classList.add("imgCarta");
        carta.draggable = true;
        carta.dataset.posicion = i;
        carta.src = "../imagenes/" + jugador.cartas[i].tipoEstrella + ".png";

        contenedores[indiceContenedor].appendChild(carta);
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

function mostrarCartaCentral(jugador) {

    const contenedor = document.getElementById("cartaCombate");

    // Limpiar 
    contenedor.innerHTML = "";

    // Crear la carta central
    if (jugador.cartaCentral) {

        const carta = document.createElement("img");

        carta.classList.add("cartaCentral");

        carta.src = "../imagenes/" + jugador.cartaCentral.tipoEstrella + ".png";

        contenedor.appendChild(carta);
    }
}


export { cartasJugadorEstrellas, cartasJugadorEstrellas2, cartas, mazoInicialEstrellas, 
    interfazCartas, mostrarErrantes, mostrarSistemaSolar, mostrarCartaCentral};