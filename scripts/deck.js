import Card from "./card.js";

export default class Deck {
    constructor() {
        this.generalDeck = [];
        this.playerUnoDeck = [];
        this.playerDosDeck = [];


    }




    crearMazo(){
        this.crearCartasNormales();
        this.crearCartasEspeciales();
        this.shuffle();
        for (let i = 1; i <= 7; i++){
            this.mostrarCartas();
        }

    }
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
    mostrarCartas(){
        const card = this.generalDeck.pop();
        const contenedorImagenes = document.createElement('div');
        const imagen = document.createElement('img');
        const contenedor = document.getElementById('mazoJugador');
        imagen.src = card.imagen;
        contenedorImagenes.className = 'cards';
        contenedorImagenes.dataset.tipo = `${card.tipo}`;
        contenedorImagenes.id = `${card.numero}${card.color}`;
        contenedor.appendChild(contenedorImagenes);
        contenedorImagenes.appendChild(imagen);
        this.playerUnoDeck.push(card);
    }
    crearCartasEspeciales (){
        for (let i = 0; i < Card.color.length; i++){
                const color = Card.color[i];
                // Cartas Reversa
                const typeReverso = "Especial_Reverso";
                const imagenReverso = `./images/reverso${color}.png`;
                const cartaEspecialReverso = new Card(color, null, imagenReverso, typeReverso);


                // Cartas +2
                const typeMasDos = "Especial_MasDos";
                const imagenMasDos = `./images/masDos${color}.png`;
                const cartaEspecialMasDos = new Card(color,null, imagenMasDos, typeMasDos);


                // Cartas Cambio de Color
                const typeCambioColor = "Especial_CambioColor";
                const imagenCambioColor = './images/cambioColor.png';
                const cartaEspecialCambioColor = new Card(null, null , imagenCambioColor, typeCambioColor)

                // Push de todas las cartas al array
                this.generalDeck.push(cartaEspecialReverso, cartaEspecialMasDos, cartaEspecialCambioColor);

        }
    }


    shuffle(){
        for (let i = this.generalDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // eslint-disable-next-line max-len
            [this.generalDeck[i], this.generalDeck[j]] = [this.generalDeck[j], this.generalDeck[i]];
        }
    }
}