//CERRAR LA FILA DE CARTAS AL PULSAR EL BOTÓN CON LA FLECHA 
//O VOLVER A ABRIRLA

const boton = document.getElementById("botonCartas");
const panel = document.getElementById("cartasJugador");

boton.addEventListener("click", () => {

    panel.classList.toggle("oculto");

    if (panel.classList.contains("oculto")) {
        boton.textContent = "▲";
    } else {
        boton.textContent = "▼";
    }

});





