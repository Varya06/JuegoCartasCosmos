//CERRAR LA FILA DE CARTAS AL PULSAR EL BOTÓN CON LA FLECHA 
//O VOLVER A ABRIRLA
import { jugadores, destruirCartaSistema, destruirCartaErrante, entregarCarta, 
    obtenerCarta} from "./accionesJugador.js";
import { interfazCartas } from "./interfazCartas.js";

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


let cartaSeleccionada = null; // Variable para almacenar la carta seleccionada
let cartaSeleccionadaErrante = null; 

//Para poder consultar el que cartas tiene el sistema solar del otro jugador, y poder atacar una de sus cartas
//FALTA: QUE SE ELIMINE EL NOMBRE DE LAS CARTAS DESTRUIDAS EN EL PANEL 
function abrirSistemaSolar() {
    const panelSistemaSolar = document.getElementById("panelSistemaSolar");
    panelSistemaSolar.classList.toggle("oculto");


    if (panelSistemaSolar.classList.contains("oculto")) {
        botonSistemaSolar.textContent = "Sistemas solares";
    } else {
        botonSistemaSolar.textContent = "Cerrar sistemas solares";
        panelSistemaSolar.innerHTML = `<h2>SISTEMAS SOLARES</h2>
        <h3>Cartas del sistema solar del otro jugador:</h3>`;

        jugadores.find(jugador => !jugador.turno).sistemaSolar.forEach(elemento => {

            // Obtener la carta y su número de órbita
            const carta = elemento[0];
            const numeroOrbita = elemento[1];

            const cartaElemento = document.createElement("img");
            cartaElemento.src = carta.imagen;
            cartaElemento.id = "cartaAdversario";

            // Guardar el elemento HTML de la carta
            carta.elementoHTML = cartaElemento;

            // Guardar el número de órbita en la imagen
            cartaElemento.dataset.orbita = numeroOrbita;

            panelSistemaSolar.appendChild(cartaElemento);

            //Acciones realizadas al mover el ratón o seleccionarlas 
            cartaElemento.addEventListener("mouseover", () => {
                //Cambia el fondo de la letra para resaltar que se va a seleccionar dicha carta
                cartaElemento.style.backgroundColor = "purple";
                cartaElemento.style.color = "white";
            });
            cartaElemento.addEventListener("mouseout", () => {
                //Cambia el fondo de la letra para resaltar que se va a seleccionar dicha carta
                cartaElemento.style.backgroundColor = "transparent";
                cartaElemento.style.color = "black";
            });
            cartaElemento.addEventListener("click", () => {
                //Cambia el fondo de la letra para resaltar que se va a seleccionar dicha carta
                cartaElemento.style.backgroundColor = "green";
                cartaElemento.style.color = "white";
                cartaSeleccionada = carta; // Almacena la carta seleccionada
                console.log("Carta seleccionada: ", cartaSeleccionada); // Muestra la carta seleccionada en la consola
                console.log("Carta seleccionada: " + cartaSeleccionada.tipoEstrella); // Muestra la carta seleccionada en la consola
            });
            //panelSistemaSolar.innerHTML += "<p>" + carta.tipoEstrella + "</p>";
        });

        const botonAtacar = document.createElement("button");
        botonAtacar.id = "botonAtacarCarta";
        botonAtacar.textContent = "Atacar carta";

        const jugador = jugadores.find(jugador => jugador.turno);
        const jugador2 = jugadores.find(jugador => !jugador.turno);
        const cartasErrantes = jugador.errantes;

        let vecesBotonAtacar = 0;


        botonAtacar.addEventListener("click", () => {

            vecesBotonAtacar += 1;

            // Actualiza el texto del botón según si está abierta la ventana o no
            if (vecesBotonAtacar % 2 === 0) {
                botonAtacar.textContent = "Atacar carta";
            } else {
                botonAtacar.textContent = "Cerrar errantes";
            }


            const panelErrantes = document.getElementById("panelErrantes");
            panelErrantes.classList.toggle("oculto");

            // Aquí se abre una ventana para seleccionar la carta errante que se va a usar para atacar
            if (cartasErrantes.length === 0) {
                alert("No tienes cartas errantes para atacar.");
            } else {

                if (!panelErrantes.classList.contains("oculto")) {
                    panelErrantes.innerHTML = '<h3>Cartas errantes listas para atacar:</h3>';
                    jugadores.find(jugador => jugador.turno).errantes.forEach(carta => {
                        const cartaErrante = document.createElement("img");
                        cartaErrante.src = carta.imagen;
                        cartaErrante.id = "cartaAdversario";

                        carta.elementoHTML = cartaErrante; //Para guardar el párrafo de la carta

                        //Acciones al pasar el ratón o seleccionarla de la lista
                        panelErrantes.appendChild(cartaErrante);

                        cartaErrante.addEventListener("mouseover", () => {
                            //Cambia el fondo de la letra para resaltar que se va a seleccionar dicha carta
                            cartaErrante.style.backgroundColor = "purple";
                            cartaErrante.style.color = "white";
                        });
                        cartaErrante.addEventListener("mouseout", () => {
                            //Cambia el fondo de la letra para resaltar que se va a seleccionar dicha carta
                            cartaErrante.style.backgroundColor = "transparent";
                            cartaErrante.style.color = "black";
                        });
                        cartaErrante.addEventListener("click", () => {
                            //Cambia el fondo de la letra para resaltar que se va a seleccionar dicha carta
                            cartaErrante.style.backgroundColor = "green";
                            cartaErrante.style.color = "white";
                            cartaSeleccionadaErrante = carta; // Almacena la carta seleccionada
                            console.log("Carta errante seleccionada: " + cartaSeleccionadaErrante.tipoEstrella);

                            //Comprobar si la carta errante seleccionada puede derrotar a la carta del sistema solar
                            if (cartaSeleccionadaErrante.ordenFuerza < cartaSeleccionada.ordenFuerza
                                && !jugador.erranteDestruida) {

                                alert("¡Has destruido la carta del sistema solar!");

                                // Buscar la posición de la carta dentro del array del sistema solar
                                let posCartaSistema = jugador2.sistemaSolar.findIndex(
                                    elemento => elemento[0] === cartaSeleccionada
                                );

                                if (posCartaSistema !== -1) {

                                    // Obtener el número de órbita antes de eliminarla
                                    let numeroOrbita = jugador2.sistemaSolar[posCartaSistema][1];

                                    //Para que desaparezca de la lista del otro jugador y de su interfaz
                                    destruirCartaSistema(jugador2, posCartaSistema);

                                    //Para que desaparezca también de la interfaz
                                    cartaSeleccionada.elementoHTML.remove();

                                    // Buscar el hueco correspondiente a la órbita
                                    let hueco;

                                    if (numeroOrbita > 0) {
                                        hueco = document.getElementById("hueco-planeta" + numeroOrbita);
                                    } else {
                                        hueco = document.getElementById("hueco-sol");
                                    }

                                    // Eliminar la imagen del hueco del sistema solar
                                    if (hueco) {
                                        hueco.innerHTML = "";
                                    }

                                    console.log("Carta del sistema solar destruida");

                                    //Para que desaparezca también la carta errante, que es de un solo uso
                                    let posCartaErrante = jugador.errantes.indexOf(cartaSeleccionadaErrante);
                                    destruirCartaErrante(jugador, posCartaErrante);

                                    //Para que desaparezca también de la interfaz
                                    cartaSeleccionadaErrante.elementoHTML.remove();

                                    //Para que solo se pueda atacar con una errante una vez por turno
                                    jugador.erranteDestruida = true;
                                    console.log("Carta errante destruida");

                                } else {
                                    console.log("No se ha encontrado la carta en el sistema solar del adversario");
                                }

                            } else if (cartaSeleccionadaErrante.ordenFuerza >= cartaSeleccionada.ordenFuerza) {
                                alert("Tú carta no es lo bastante fuerte para destruirla :(");
                            } else if (jugador.erranteDestruida) {
                                alert("Solo puedes atacar con una errante durante tu turno");
                            }

                        });
                    });
                };
            };

        });

        panelSistemaSolar.appendChild(botonAtacar);
    }
};

//BOTÓN PARA MOSTRAR LAS SIGUIENTES CARTAS DEL MAZO 
//BOTÓN PARA MOSTRAR LAS CARTAS SIGUIENTES DEL JUGADOR 
const botonSiguientesCartas = document.getElementById("botonSiguientesCartas");
const cartas = document.querySelectorAll("#filaCartas .carta");
const totalCartas = cartas.length;
const cartasMostradas = 7; // Número de cartas que se muestran inicialmente
let inicio = 0; // Índice de la primera carta mostrada



function moverMazo(){
    const jugadorActual = jugadores.find(jugador => jugador.turno);
    const totalCartasJugador = jugadorActual.cartas.length;

    // Calcular el nuevo índice de inicio
    inicio = (inicio + cartasMostradas) % totalCartasJugador;

    // Mostrar las cartas correspondientes
    interfazCartas(jugadorActual, inicio);
}

botonSiguientesCartas.addEventListener("click", () => {
    console.log("Botón de siguientes cartas pulsado");
    moverMazo();
});





//Abrir el menú de selección de cartas cuando un jugador coloque una 
//carta de batalla central 

function abrirMenuCombate(jugadorSiguiente,cartaCentral){
    const panelCombate = document.getElementById("panelCombate");
    panelCombate.classList.toggle("oculto");
    
    //Crear el texto 
    panelCombate.innerHTML = `<h2>COMBATE DE CARTAS  </h2>
        <h3>El otro jugador debe abrir su mazo y seleccionar la carta
    a entregar:</h3>`;

    //Crear un botón para que el otro jugador acceda a su mazo 
    const botonCombate = document.createElement('button');
    botonCombate.innerHTML = "Ver mazo";
    botonCombate.id = "botonCombate";
    panelCombate.appendChild(botonCombate);

    //Abrir el mazo al pulsar el boton 
    botonCombate.addEventListener("click", () => {
        abrirMazo(jugadorSiguiente,cartaCentral); //DESARROLLAR FUNCIÓN
        console.log("Botón de combate pulsado");
    });

    //BOTÓN PARA CERRAR EL MENÚ!!
    const boton = document.createElement("button");
    boton.innerHTML = "Cerrar";
    boton.className = "botonCerrar";
    panelCombate.appendChild(boton); 

    boton.addEventListener("click",()=>{
        panelCombate.classList.toggle("oculto");
    });
}

function abrirMazo(jugadorSiguiente,cartaCentral){
    const panelCartas = document.getElementById("panelCartas");
    panelCartas.classList.toggle("oculto");

    //Para limpiarlo de los elementos que había antes
    panelCartas.innerHTML = "";

    const info = document.createElement("h2");
    info.innerHTML = "Selecciona una carta menor para entregar:";
    panelCartas.appendChild(info);

    jugadores.find(jugador => !jugador.turno).cartas.forEach(carta => {
            const cartaElemento = document.createElement("img");
            cartaElemento.src = carta.imagen;
            cartaElemento.id = "cartaAdversario";

            carta.elementoHTML = cartaElemento;

            panelCartas.appendChild(cartaElemento);

            //Comprobar que la carta realmente es menor a la otra y despues destruirla 
            //y transferirla al mazo del otro jugador
            cartaElemento.addEventListener("click", () => {
                cartaSeleccionada= carta; // Almacena la carta seleccionada
                console.log("Carta seleccionada para entregar: " + cartaSeleccionada.tipoEstrella); 

                //Comprobar si la carta errante seleccionada puede derrotar a la carta del sistema solar
                if (cartaSeleccionada.ordenFuerza > cartaCentral.ordenFuerza) {
                    alert("¡Has entregado esta carta!");
                    let tipoCarta = cartaSeleccionada.tipoEstrella; 
                    let posCarta = jugadorSiguiente.cartas.indexOf(tipoCarta);

                    //Para que desaparezca de la lista del otro jugador y de su interfaz 
                    entregarCarta(jugadorSiguiente,posCarta);

                    //Para que desaparezca también de la interfaz
                    cartaSeleccionada.elementoHTML.remove();

                    //Para que aparezca en el mazo del jugador que ha ganado la batalla
                    const jugadorActual = jugadores.find(jugador => jugador.turno);
                    obtenerCarta(jugadorActual,cartaSeleccionada);

                    //Hacer que la carta central de batalla sea devuelta al mazo del jugador
                    const cartaCombate = document.getElementById("cartaCombate");
                    cartaCombate.innerHTML = null;
                    jugadorActual.cartaCentral = null; //para que deje de tener la referencia
                    obtenerCarta(jugadorActual,cartaCentral);
                        
                    console.log("Carta entregada");

                } else {
                    alert("No puedes entregar una carta mayor a la atacante");
                }
            });
    });

    const boton = document.createElement("button");
    boton.innerHTML = "Cerrar mazo";
    boton.className = "botonCerrar";
    panelCartas.appendChild(boton); 

    boton.addEventListener("click",()=>{
        panelCartas.classList.toggle("oculto");
    });
}

export{abrirMenuCombate};






