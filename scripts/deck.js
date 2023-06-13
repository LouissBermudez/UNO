import Card from "./card.js";

export default class Deck {

    /** Se crean los arrays de los mazos principales.
     * @constructor
     */
    constructor() {
        this.generalDeck = [];
        this.mesaDeck = [0];
        this.playerUnoDeck = [0];
        this.playerDosDeck = [0];
    }


    /** Esta funcion se encarga de crear el mazo de cada jugador, llamando a las demas funciones.
     * @function
     */
    crearMazo(){
        this.crearCartasNormales();
        this.crearCartasEspeciales();
        this.shuffle();
        this.cartaNuevoJuego();
        for (let i = 1; i <= 7; i++){
            this.mostrarCartasP1();
            this.mostrarCartasP2()
        }

    }


    /**Función que añade la carta inicial a la mesa
     * @function
     */
    cartaNuevoJuego(){
        const card = this.generalDeck.pop();
        this.mesaDeck.push(card)
        console.log(this.mesaDeck)
        if (card.numero != null) {
            const contenedorImagen = document.createElement('div')
            const imagen = document.createElement('img')
            const contenedor = document.getElementById("cartaComienzo")
            imagen.src = card.imagen;
            contenedorImagen.className = 'cartaComienzo';
            contenedorImagen.dataset.tipo = `${card.tipo}`
            contenedor.appendChild(contenedorImagen);
            contenedorImagen.appendChild(imagen);
            contenedorImagen.id = `${card.numero}${card.color}`;
            contenedorImagen.dataset.color = card.color;
            contenedorImagen.dataset.numero = card.numero;
        }else{
            document.location.reload();
        }


    }

    /** Función que crea las cartas de tipo "Normal", es decir las cartas con número y color
     * @function
     */
    crearCartasNormales() {
        for (let i = 0; i < Card.color.length ; i++){
            for (let j = 0; j < 9; j++) {
                const color = Card.color[i];
                const numero = Card.numero[j];
                const type = "Normal";
                const imagen = `./images/${numero}${color}.png`;
                const cardNormal = new Card(color, numero, imagen, type)
                this.generalDeck.push(cardNormal);

            }
        }
        console.log(this.generalDeck);


    }

    /** Función que se encarga de mostrar las cartas del mazo del jugador 1 en pantalla.
     * @function
     */
    mostrarCartasP1(){
        const card = this.generalDeck.pop();
        const contenedorImagenes = document.createElement('div');
        const imagen = document.createElement('img');
        const contenedor = document.getElementById('mazoJugador');
        imagen.src = card.imagen;
        contenedorImagenes.className = 'cards';
        contenedorImagenes.draggable = true;
        contenedorImagenes.dataset.tipo = `${card.tipo}`;
        contenedorImagenes.dataset.color = card.color;
        contenedorImagenes.dataset.numero = card.numero;

        if (card.numero != null) {
            contenedorImagenes.id = `${card.numero}${card.color}`;
        }else if (card.color == null){
            contenedorImagenes.id = 'cambioolor';
        }else{
            contenedorImagenes.id = `especial${card.color}`
        }

        contenedor.appendChild(contenedorImagenes);
        contenedorImagenes.appendChild(imagen);
        this.playerUnoDeck.push(card);

        /** Función que muestra por pantalla las cartas del mazo del jugador 2.
         * @function
          */
    }mostrarCartasP2(){
        const card = this.generalDeck.pop();
        const contenedorImagenes = document.createElement('div');
        const imagen = document.createElement('img');
        const contenedor = document.getElementById('mazoJugadorDos');
        imagen.src = card.imagen;
        contenedorImagenes.className = 'cards';
        contenedorImagenes.draggable = true;
        contenedorImagenes.dataset.tipo = `${card.tipo}`;
        contenedorImagenes.dataset.color = card.color;
        contenedorImagenes.dataset.numero = card.numero;

        if (card.numero != null) {
            contenedorImagenes.id = `${card.numero}${card.color}`;
        }else if (card.color == null){
            contenedorImagenes.id = 'cambioColor';
        }else{
            contenedorImagenes.id = `especial${card.color}`
        }

        contenedor.appendChild(contenedorImagenes);
        contenedorImagenes.appendChild(imagen);
        this.playerDosDeck.push(card);
    }


    /** Función que crea las cartas de tipo "Especial", es deci las cartas: Reverso, +2 y +4.
     * @function
     */
    crearCartasEspeciales (){
        for (let i = 0; i < Card.color.length; i++){
                const color = Card.color[i];

                // Cartas +2
                const typeMasDos = "Especial_MasDos";
                const imagenMasDos = `./images/masDos${color}.png`;
                const cartaEspecialMasDos = new Card(color,null, imagenMasDos, typeMasDos);
                // Cartas +4
                const typeMasCuatro = "Especial_MasCuatro";
                const imagenMasCuatro = './images/masCuatro.png'
                const cartaEspecialMasCuatro = new Card(null, null, imagenMasCuatro, typeMasCuatro);

                // Cartas Cambio de Color
                const typeCambioColor = "Especial_CambioColor";
                const imagenCambioColor = './images/cambioColor.png';
                const cartaEspecialCambioColor = new Card(null, null , imagenCambioColor, typeCambioColor)



                // Carta saltar turno
                const typeSaltarTurno = "Especial_SaltarTurno"

                // Push de todas las cartas al array
                this.generalDeck.push(cartaEspecialMasDos, cartaEspecialCambioColor, cartaEspecialMasCuatro);

        }
    }

    /** Función que barajea las cartas del mazo.
     * @function
     */
    shuffle(){
        for (let i = this.generalDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // eslint-disable-next-line max-len
            [this.generalDeck[i], this.generalDeck[j]] = [this.generalDeck[j], this.generalDeck[i]];
        }
    }
}