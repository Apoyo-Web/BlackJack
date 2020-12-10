/**
 * C= Trebol D=Diamante H=Corazones S=Espadas
 */



let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;


//EVENTOS
const btnPedir = document.querySelector('#btnpedir');
const marcadorPuntos = document.querySelectorAll('span');



//Esta funcio crea una nueba baraja
const crearDeck = () => {
    for (let i = 2; i < 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }

    for (let tipo of tipos) {
        for (let especial of especiales) {
            deck.push(especial + tipo);
        }
    }

    
    deck = _.shuffle(deck);

    console.log(deck);
    return deck;
}

crearDeck();
 

//Esta función me permite tomar una carta

const pedirCarta = () => {

    if (deck.length === 0) {
        alert("No quedan cartas en la baraja. ¡Introducimos una nueva!");
        crearDeck();
    }
    let carta = deck.pop();
    
    return carta;
    

}


//pedirCarta();

const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1);
    
    return (isNaN(valor)) ?

        (valor === 'A') ? 11 : 10
        : valor * 1;
    // let puntos = 0;

    // if (isNaN(valor)) {
        
    //     puntos = (valor === 'A') ? 11 : 10;
    // } else {

    //     puntos = valor * 1;
    // }

    // console.log(puntos);
}




btnPedir.addEventListener('click', () => {
    
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    marcadorPuntos[0].innerText = puntosJugador;
    console.log(puntosJugador);
})