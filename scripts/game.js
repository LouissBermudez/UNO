
import Deck from "./deck.js";
import Player from "./player.js";

export default class Game{
    /**
     *@constructor
     */
    constructor() {
    this.deck = new Deck();
    this.turno = 0;
    this.currentPlayer = new Player("JUGADOR 1")
    this.colorChange = document.getElementById("cambioColor")
    }

    /** Función que empieza el juego
     *
     * @function
     */
    startGame() {
        this.deck.crearMazo();
        this.deck.shuffle();
        this.sortable();
        this.botonDarCarta()
        this.winnerCheck();
    }


    /**
     * Función que se encarga de todo lo relacionado con el Drag And Drop, utilizando la librería Sortable JS
     * @function
     */
    sortable(){
        const mazoJugadorUno = document.getElementById("mazoJugador");
        const mazoJugadorDos = document.getElementById("mazoJugadorDos");
        const mazoMesa = document.getElementById("mazoMesa");
        const cartaComienzo = document.querySelector(".cartaComienzo")


        const arrastrarMazoP1 = Sortable.create(mazoJugadorUno, {
            group: {
                name: 'shared',
                put: false
            },
            sort: false,
            animatiom: 150,
            onChoose:  (evt) =>{
                const cartaDrag = evt.item;
                const indice = evt.oldIndex + 1;
                const cartaArray = this.deck.playerUnoDeck.filter((value) => indice);
                const cartaDragArray = cartaArray[indice];
                this.verificarCarta(cartaDragArray, arrastrarMazoMesa);
                this.botonColor(cartaDragArray)
                console.log(indice)



                mazoMesa.classList.add('highlight');
           },

            onRemove: (evt) =>{
                const indice = evt.oldIndex + 1;
                const cartaDrag = this.deck.playerUnoDeck.splice(indice, 1);
                const eliminarCartaDrag = cartaDrag[0]
                this.deck.mesaDeck.push(eliminarCartaDrag);
                console.log(this.deck.mesaDeck)
                this.verificarMasDos(eliminarCartaDrag);
                this.verificarMasCuatro(eliminarCartaDrag);
                this.turno = 1;
                mazoJugadorUno.style.visibility = "hidden"
                this.cambiarTurno(mazoJugadorUno, mazoJugadorDos)


            },
            onEnd: function (evt) {
                mazoMesa.classList.remove('highlight');
            }

        })

        const arrastrarMazoP2 = Sortable.create(mazoJugadorDos, {
            group: {
                name: 'shared',
                put: false,

            },
            sort: false,
            animatiom: 150,
            onChoose:  (evt) => {
                const cartaDrag = evt.item;
                const indice = evt.oldIndex + 1;
                const cartaArray = this.deck.playerDosDeck.filter((value) => indice);
                const cartaDragArray = cartaArray[indice];
                console.log(cartaDragArray)

                this.verificarCarta(cartaDragArray, arrastrarMazoMesa);

                this.botonColor(cartaDragArray)


                mazoMesa.classList.add('highlight');
            },
            onRemove: (evt) =>{
                const indice = evt.oldIndex + 1;
                const cartaDrag = this.deck.playerDosDeck.splice(indice, 1);
                const eliminarCartaDrag = cartaDrag[0]
                this.deck.mesaDeck.push(eliminarCartaDrag);
                this.turno = 0
                mazoJugadorDos.style.visibility = "hidden";
                this.verificarMasDos(eliminarCartaDrag);
                this.verificarMasCuatro(eliminarCartaDrag);
                this.cambiarTurno(mazoJugadorUno, mazoJugadorDos);
                this.cambiarTurno(mazoJugadorUno, mazoJugadorDos);
            },
            onEnd: function (evt) {
                mazoMesa.classList.remove('highlight');
            }

        })
        const arrastrarMazoMesa = Sortable.create(mazoMesa, {
            group: {
                name: 'shared',
            },
            animatiom: 150,
            sort:false,


        })



    }


    /**
     * Función que se encarga de verificar el número, color y tipo de las cartas arrastradas.
     * @param {object}cartaDragArray
     * @param {htmlelement}arrastrarMazoMesa
     * @function
     */

    verificarCarta(cartaDragArray, arrastrarMazoMesa) {
        const carta = this.deck.mesaDeck[this.deck.mesaDeck.length - 1];


        if (carta.color !== cartaDragArray.color && carta.numero !== cartaDragArray.numero){
            arrastrarMazoMesa.option('disabled', true)
        } else if (carta.numero === cartaDragArray.numero){
            arrastrarMazoMesa.option('disabled', false)
        }else{
            arrastrarMazoMesa.option('disabled', false)
        }


        if(cartaDragArray.tipo === "Especial_CambioColor" ) {
            arrastrarMazoMesa.option('disabled', false)
            this.colorChange.style.visibility = "visible";
        }

        if (cartaDragArray.tipo === "Especial_MasCuatro"){
            arrastrarMazoMesa.option('disabled', false);
        }
    }


    /**
     * Función que se encarga de verificar el ganador de la partida.
     * @function
     */
    winnerCheck(){
        if (this.deck.playerUnoDeck.length === 0){
            alert("Player Uno Ha ganado")
        }else if (this.deck.playerDosDeck.length === 0){
            alert("Player Dos Ha ganado")
        }
    }

    /**
     * Función que se encarga de añadir las cartas al jugador contrario al poner un +2 en la mesa.
     * @param {object}cartaDragArray
     * @function
     */
    verificarMasDos(cartaDragArray){
        if (cartaDragArray.tipo === "Especial_MasDos"){

            if (this.turno === 0){
                for (let i = 0; i < 2; i++){
                    this.deck.mostrarCartasP2()
                }
            }else if (this.turno === 1){
                for (let i = 0; i < 2; i++){
                    this.deck.mostrarCartasP1()
                }
            }
        }
    }

    /**
     * Función que se encarga de añadir las cuatro cartas al mazo del contrincante al poner un +4 en la mesa
     * @param {object}cartaDrag
     * @function
     */
    verificarMasCuatro(cartaDrag){
        this.colorChange.style.visibility = "visible";
        if(cartaDrag.tipo === "Especial_MasCuatro"){
            if (this.turno === 0){
                for (let i = 0; i < 4; i++){
                    this.deck.mostrarCartasP2()

                }
            }else if (this.turno === 1){
                for (let i = 0; i < 4; i++){
                    this.deck.mostrarCartasP1()
                }
            }
        }
    }

    /**
     * Función que se encarga de la funcionalidad de la elección de colores al poner una carta de tipo: Cambio de Color o +4
     * @param{object} cartaDrag
     */
    botonColor(cartaDrag){
        const azul = document.getElementById("azul")
        const rojo = document.getElementById("rojo")
        const verde = document.getElementById("verde")
        const amarillo = document.getElementById("amarillo")



        azul.addEventListener("click", () =>{
            cartaDrag.color = "Azul";
            this.colorChange.style.visibility = "hidden"
        }) ;
        rojo.addEventListener("click", () =>{
            cartaDrag.color = "Rojo";
            this.colorChange.style.visibility = "hidden"
        });
        verde.addEventListener("click", () =>{
            cartaDrag.color = "Verde";
            this.colorChange.style.visibility = "hidden"
        });
        amarillo.addEventListener("click", () =>{
            cartaDrag.color = "Amarillo";
            this.colorChange.style.visibility = "hidden"
        });

    }


    /**
     * Botón para dar una carta a cada jugador dependiendo del turno
     * @function
     */
    botonDarCarta(){
        const boton = document.getElementById("pedirCarta")
        boton.addEventListener("click" ,() => {

            if (this.currentPlayer.nombre === "JUGADOR 1"){
                this.deck.mostrarCartasP1();
            }else if (this.currentPlayer.nombre === "JUGADOR 2"){
                this.deck.mostrarCartasP2();
            }


        })
    }


    verificarNumero(cartaDragArray, cartaComienzo, arrastrarMazoMesa){
        if (cartaDragArray.numero !== cartaComienzo.numero){
            arrastrarMazoMesa.option('disabled', true);
        }else {
            arrastrarMazoMesa.option('disabled', true);
        }
    }


    /**
     * Función que se encarga de cambiar el turno del jugador.
     * @param {htmlelement}mazoJugadorUno
     * @param {htmlelement}mazoJugadorDos
     * @function
     */
    cambiarTurno(mazoJugadorUno, mazoJugadorDos) {
        if (this.turno === 0) {
            this.currentPlayer = new Player('JUGADOR 1');

            mazoJugadorUno.style.visibility = 'visible';

        } else if (this.turno === 1) {
            this.currentPlayer = new Player('JUGADOR 2');
            mazoJugadorDos.style.visibility = 'visible';

        }
        console.log(this.currentPlayer);
    }





}