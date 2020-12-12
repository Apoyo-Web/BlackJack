/**
 * C= Trebol D=Diamante H=Corazones S=Espadas
 */



let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
 puntosComputadora = 0;


//REFERENCIA DEL HTML
const btnPedir = document.querySelector('#btnpedir');
const btnDetener = document.querySelector('#btndetener');
const btnNuevo = document.querySelector('#nuevoJuego');
const marcadorPuntos = document.querySelectorAll('span');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');





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

//IA Computadora

const turnoComputadora = (puntosMinimos) => {
    
    
    do {
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        marcadorPuntos[1].innerText = puntosComputadora;
    

        //Creacion imagen 
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        if (puntosMinimos > 21) {
            break;
        }

    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
    
    setTimeout(() => {
        if (puntosMinimos > 21) {
            alert("Has perdido");
        } else if ((puntosComputadora <= 21) && (puntosComputadora > puntosMinimos)) {
            alert("Has perdido")
        } else if (puntosMinimos === puntosComputadora) {
            alert("Empatados");
        } else {
            alert("¡Has ganado!");
        }
    }, 100 );

    

}


btnPedir.addEventListener('click', () => {
    
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    marcadorPuntos[0].innerText = puntosJugador;
    console.log(puntosJugador);

    //Creacion imagen 
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);


    if (puntosJugador > 21) {
        
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        marcadorPuntos[0].innerText = `${puntosJugador} ¡Te pasastes!`;
        turnoComputadora(puntosJugador);

    } else if (puntosJugador === 21) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        marcadorPuntos[0].innerText = `${puntosJugador} ¡Genial!`;
        turnoComputadora(puntosJugador);
        
    }

})

btnDetener.addEventListener('click', () => {
    btnDetener.disabled = true;
    btnPedir.disabled = true;
    turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click', () => {
    
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    deck = [];
    deck = crearDeck();
    puntosComputadora = 0;
    puntosJugador = 0;
    marcadorPuntos[0].innerText = 0;
    marcadorPuntos[1].innerText = 0;
    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';


})