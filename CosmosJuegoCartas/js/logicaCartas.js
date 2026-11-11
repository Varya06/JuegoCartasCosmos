//Comprobaciones de las cartas en el sistema solar para ver si se pueden destruir o no
//Funciones características de las cartas, como fusion de estrellas, cartas de vida, agujeros negros, etc

function comprobarOrbita(carta, numeroOrbita,jugador) {
    // Obtener la posición de la carta en el sistema solar del jugador
    const posCartaSistema = jugador.sistemaSolar.findIndex(([cartaSistema, orbita]) => cartaSistema === carta && orbita === numeroOrbita);

    // Verificar si hay cartas en órbitas exteriores a la seleccionada
    for (let i = posCartaSistema + 1; i < jugador.sistemaSolar.length; i++) {
        if (jugador.sistemaSolar[i][0] !== null) {
            return false; // Hay cartas en órbitas exteriores
        }
    }

    return true; // No hay cartas en órbitas exteriores
}

export { comprobarOrbita };