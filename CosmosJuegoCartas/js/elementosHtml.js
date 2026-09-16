//CERRAR LA FILA DE CARTAS AL PULSAR EL BOTÓN CON LA FLECHA 
//O VOLVER A ABRIRLA
import { jugadores } from "./accionesJugador.js";

const boton = document.getElementById("botonCartas");
const botonSistemaSolar = document.getElementById("botonVerSistema");
const panel = document.getElementById("cartasJugador");

boton.addEventListener("click", () => {

    panel.classList.toggle("oculto");

    if (panel.classList.contains("oculto")) {
        boton.textContent = "▲";
    } else {
        boton.textContent = "▼";
    }

});

botonSistemaSolar.addEventListener("click", () => {

    abrirSistemaSolar();
});

//Para poder consultar el que cartas tiene el sistema solar del otro jugador, y poder atacar una de sus cartas
//FALTA: QUE EL NOMBRE DE LA CARTA ELEGIDA CAMBIE DE COLOR AL SELECCIONARLO Y QUE AL ATACAR CARTA SE ABRA LA LISTA DE 
//CARTAS ERRANTES PARA ELEGIR CUAL USAR Y COMPROBAR SI LA DERROTA O NO 
function abrirSistemaSolar() {
    const panelSistemaSolar = document.getElementById("panelSistemaSolar");
    panelSistemaSolar.classList.toggle("oculto");

    if (panelSistemaSolar.classList.contains("oculto")) {
        botonSistemaSolar.textContent = "Sistemas solares";
    } else {
        botonSistemaSolar.textContent = "Cerrar sistemas solares";
        panelSistemaSolar.innerHTML = `<h2>SISTEMAS SOLARES</h2>
        <h3>Cartas del sistema solar del otro jugador:</h3>`;

        jugadores.find(jugador => !jugador.turno).sistemaSolar.forEach(carta => {
            panelSistemaSolar.innerHTML += "<p>" + carta.tipoEstrella + "</p>";
        });

        const botonAtacar = document.createElement("button");
        botonAtacar.id = "botonAtacarCarta";
        botonAtacar.textContent = "Atacar carta";
        panelSistemaSolar.appendChild(botonAtacar);
    }
}; 


//BOTÓN PARA MOSTRAR LAS CARTAS SIGUIENTES DEL JUGADOR (ARREGLAR)
const botonSiguientesCartas = document.getElementById("botonSiguientesCartas");
const cartas = document.querySelectorAll("#filaCartas .carta");
const totalCartas = cartas.length;
const cartasMostradas = 7; // Número de cartas que se muestran inicialmente
let inicio = 0; // Índice de la primera carta mostrada

function moverMazo(){
    cartas.forEach(carta => carta.classList.add("ocultar"));

    // Calcular el nuevo índice de inicio
    inicio = (inicio + cartasMostradas) % totalCartas;

    // Mostrar las cartas correspondientes
    for (let i = 0; i < cartasMostradas; i++) {
        const indice = (inicio + i) % totalCartas;
        cartas[indice].classList.remove("ocultar");
    }

    botonSiguientesCartas.disabled = inicio >= totalCartas - cartasMostradas;
}

botonSiguientesCartas.addEventListener("click", () => {
    console.log("Botón de siguientes cartas pulsado");
    // Ocultar todas las cartas
    if (inicio + cartasMostradas < totalCartas) {
        inicio += 1; // Avanzar una carta
        moverMazo();
    }
});








