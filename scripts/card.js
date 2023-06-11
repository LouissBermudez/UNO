import Deck from "./deck.js";


export default class Card {

    static color = ['Rojo', 'Verde', 'Azul','Amarillo'];
    static numero = ['uno','dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve']
    constructor(color,numero, imagen, tipo) {
        this.color = color;
        this.numero = numero;
        this.imagen = imagen;
        this.tipo = tipo;
    }


}