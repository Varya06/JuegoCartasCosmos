//INICIALIZACIÓN DE VARIABLES
const cartas = [];


                                       //CLASES DE CARTAS
                                
//Cartas de estrellas
class CartaEstrella {
    constructor(sistemaSolar, tipo,vida) {
        this.sistemaSolar = true;
        this.tipo = "estrella";
        this.vida = false;
    }
}

class CartaEstrellaAzul extends CartaEstrella {
    constructor(sistemaSolar, tipo, ordenFuerza, imagen, tipoEstrella, puntos,rareza,vida) {
        super(sistemaSolar, tipo,vida);
        this.ordenFuerza = 2;
        this.imagen = "../imagenes/estrellaAzul.png";
        this.tipoEstrella = "estrellaAzul";
        this.puntos = 5;
        this.rareza = "rara";
    }

}

class CartaEstrellaRoja extends CartaEstrella {
    constructor(sistemaSolar, tipo, ordenFuerza, imagen, tipoEstrella, puntos,rareza,vida) {
        super(sistemaSolar, tipo,vida);
        this.ordenFuerza = 3;
        this.imagen = "../imagenes/estrellaRoja.png";
        this.tipoEstrella = "estrellaRoja";
        this.puntos = 4;
        this.rareza = "rara";
    }
}

class CartaEstrellaAmarilla extends CartaEstrella {
    constructor(sistemaSolar, tipo, ordenFuerza, imagen, tipoEstrella, puntos,rareza,vida) {
        super(sistemaSolar, tipo,vida);
        this.ordenFuerza = 4;
        this.imagen = "../imagenes/estrellaAmarilla.png";
        this.tipoEstrella = "estrellaAmarilla";
        this.puntos = 3;
        this.rareza = "escasa";
    }
}

class CartaGiganteRoja extends CartaEstrella {
    constructor(sistemaSolar, tipo, ordenFuerza, imagen, tipoEstrella, puntos,rareza,vida) {
        super(sistemaSolar, tipo,vida);
        this.ordenFuerza = 4;
        this.imagen = null;
        this.tipoEstrella = "gigante Roja";
        this.puntos = 0;
        this.rareza = "escasa";
    }
}

class CartaEnanaBlanca extends CartaEstrella {
    constructor(sistemaSolar, tipo, ordenFuerza, imagen, tipoEstrella, puntos,rareza,vida) {
        super(sistemaSolar, tipo,vida);
        this.ordenFuerza = 0;
        this.imagen = null;
        this.tipoEstrella = "enana blanca";
        this.puntos = 0;
        this.rareza = "escasa";
    }
}


//Cartas de planetas
class CartaPlaneta {
    constructor(sistemaSolar, tipo,vida) {
        this.sistemaSolar = true;
        this.tipo = "planeta";
        this.vida = true;
    }
}

class CartaPlanetaGaseoso extends CartaPlaneta {
    constructor(sistemaSolar,tipo,ordenFuerza,imagen,tipoPlaneta,puntos,rareza,vida){
        super(sistemaSolar,tipo,vida);
        this.ordenFuerza = 5;
        this.imagen = null;
        this.tipoPlaneta = "gaseoso";
        this.puntos = 2;
        this.rareza = "inusual";
    }
}

class CartaPlanetaRocoso extends CartaPlaneta {
    constructor(sistemaSolar,tipo,ordenFuerza,imagen,tipoPlaneta,puntos,rareza,vida){
        super(sistemaSolar,tipo,vida);
        this.ordenFuerza = 6;
        this.imagen = null;
        this.tipoPlaneta = "rocoso";
        this.puntos = 2;
        this.rareza = "inusual";
    }
}

//Carta de luna
class CartaLuna {
    constructor(sistemaSolar,tipo,vida, ordenFuerza,imagen,puntos,rareza){
        this.sistemaSolar = true;
        this.tipo = "luna";
        this.vida = false;
        this.ordenFuerza = 7;
        this.imagen = null;
        this.puntos = 1;
        this.rareza ="habitual";
    }
}


//Carta de cometa
class CartaCometa {
    constructor(sistemaSolar,tipo,vida, ordenFuerza,imagen,puntos,rareza){
        this.sistemaSolar = true;
        this.tipo = "cometa";
        this.vida = false;
        this.ordenFuerza = 8;
        this.imagen = null;
        this.puntos = 1;
        this.rareza ="común";
    }
}

//Carta de meteorito
class CartaMeteorito {
    constructor(sistemaSolar,tipo,vida, ordenFuerza,imagen,puntos,rareza){
        this.sistemaSolar = true;
        this.tipo = "meteorito";
        this.vida = false;
        this.ordenFuerza = 9;
        this.imagen = null;
        this.puntos = 1;
        this.rareza ="común";
    }
}

//Carta de agujero negro
class CartaAgujeroNegro {
    constructor(sistemaSolar,tipo,vida, ordenFuerza,imagen,puntos,rareza){
        this.sistemaSolar = true;
        this.tipo = "agujero negro";
        this.vida = false;
        this.ordenFuerza = 1;
        this.imagen = null;
        this.puntos = 7;
        this.rareza ="legendario";
    }
}

//Carta de agujero blanco
class CartaAgujeroBlanco {
    constructor(sistemaSolar,tipo,vida, ordenFuerza,imagen,puntos,rareza){
        this.sistemaSolar = true;
        this.tipo = "agujero blanco";
        this.vida = false;
        this.ordenFuerza = null;
        this.imagen = null;
        this.puntos = null;
        this.rareza ="legendario";
    }
}

//Carta de tiempo
class CartaTiempo {
    constructor(sistemaSolar,tipo,imagen,rareza){
        this.sistemaSolar = false;
        this.tipo = "tiempo";
        this.imagen = null;
        this.rareza = "inusual";
    }
}

//Carta de gravedad
class CartaGravedad {
    constructor(sistemaSolar,tipo,imagen,rareza){
        this.sistemaSolar = false;
        this.tipo = "gravedad";
        this.imagen = null;
        this.rareza = "inusual";
    }
}

//Carta de agujero de gusano
class CartaAgujeroGusano {
    constructor(sistemaSolar,tipo,imagen,rareza){
        this.sistemaSolar = false;
        this.tipo = "agujero de gusano";
        this.imagen = null;
        this.rareza = "legendario";
    }
}

//Carta de supernova
class CartaSupernova {
    constructor(sistemaSolar,tipo,imagen,rareza){
        this.sistemaSolar = false;
        this.tipo = "supernova";
        this.imagen = null;
        this.rareza = "legendario";
    }
}

//Carta de vida
class CartaVida {
    constructor(sistemaSolar,tipo,imagen,rareza){
        this.sistemaSolar = false;
        this.tipo = "vida";
        this.imagen = null;
        this.rareza = "inusual";
    }
}

//Carta de nebulosa
class CartaNebulosa {
    constructor(sistemaSolar,tipo,imagen,rareza){
        this.sistemaSolar = false;
        this.tipo = "nebulosa";
        this.imagen = null;
        this.rareza = "inusual";
    }
}

//Carta de naves espaciales
class CartaNaveEspacial {
    constructor(sistemaSolar,tipo,imagen,rareza){
        this.sistemaSolar = false;
        this.tipo = "nave espacial";
        this.imagen = null;
        this.rareza = "inusual";
    }
}

//Carta de satélites
class CartaSatelite {
    constructor(sistemaSolar,tipo,imagen,rareza){
        this.sistemaSolar = false;
        this.tipo = "satélite";
        this.imagen = null;
        this.rareza = "inusual";
    }
}


cartas[0] = new CartaEstrellaAzul();
cartas[1] = new CartaEstrellaRoja();
cartas[2] = new CartaEstrellaAmarilla();
cartas[3] = new CartaPlanetaGaseoso();
cartas[4] = new CartaPlanetaRocoso();
cartas[5] = new CartaLuna();
cartas[6] = new CartaCometa();
cartas[7] = new CartaMeteorito(); 
cartas[8] = new CartaAgujeroNegro();
cartas[9] = new CartaAgujeroBlanco();
cartas[10] = new CartaTiempo();
cartas[11] = new CartaGravedad();
cartas[12] = new CartaSupernova();
cartas[13] = new CartaVida();
cartas[14] = new CartaNebulosa();
cartas[15] = new CartaNaveEspacial();
cartas[16] = new CartaSatelite();
cartas[17] = new CartaGiganteRoja();
cartas[18] = new CartaEnanaBlanca();

//COMPROBACIONES
const cartasEstrella = [];
cartasEstrella[0] = new CartaEstrellaAzul();
cartasEstrella[1] = new CartaEstrellaRoja();
cartasEstrella[2] = new CartaEstrellaAmarilla();

//console.log(cartas); //acceder a la lista de cartas 

//console.log(cartas[0].tipoEstrella); //acceder a una propiedad de la carta
//Acceder a una propiedad de todas las cartas

//for (let carta of cartas) {
    //console.log(carta.tipo);
//}

//EXPORTAR LAS CLASES 
export {cartas};
export {cartasEstrella};