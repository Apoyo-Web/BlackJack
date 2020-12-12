
const miJuego = (() => {
    'use strict'

let deck = [];
const tipos = ['C', 'D', 'H', 'S'],
      especiales = ['A', 'J', 'Q', 'K'];

let puntosJugadores = [];
    


//REFERENCIA DEL HTML
const btnPedir = document.querySelector('#btnpedir'),
    btnDetener = document.querySelector('#btndetener'),
    btnNuevo = document.querySelector('#btnnuevo'),
    marcadorPuntos = document.querySelectorAll('span'),
    divCartasJugadores = document.querySelectorAll('.divCartas');


const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck();
    
    puntosJugadores = [];
    for (let i = 0; i < numJugadores; i++){
        puntosJugadores.push(0);

    }

    marcadorPuntos.forEach(elem => elem.innerText = 0);
    divCartasJugadores.forEach(elem => elem.innerHTML = '');

    btnPedir.disabled = false;
    btnDetener.disabled = false;


}


//Esta funcio crea una nueba baraja
    const crearDeck = () => {
        deck = [];
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

    
    return _.shuffle(deck);

    
     
}


 

//Esta función me permite tomar una carta

const pedirCarta = () => {

    if (deck.length === 0) {
        
        crearDeck();
    }
     return deck.pop();
    
}


//pedirCarta();

const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1);
    
    return (isNaN(valor)) ?

        (valor === 'A') ? 11 : 10
        : valor * 1;
    
}

//IA Computadora

    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        marcadorPuntos[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];

    }

    const crearCarta = (carta, turno) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
       
    }


    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;
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
const turnoComputadora = (puntosMinimos) => {
    
    let puntosComputadora = 0;
    do {
        const carta = pedirCarta();
        puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);

        crearCarta(carta, puntosJugadores.length - 1);
    

    } while ((puntosComputadora <= puntosMinimos) && (puntosMinimos <= 21));

    determinarGanador();
    
    

    

}


btnPedir.addEventListener('click', () => {
    
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0);
    crearCarta(carta, 0);
    


    if (puntosJugador > 21) {
        
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        
        turnoComputadora(puntosJugador);

    } else if (puntosJugador === 21) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        
        turnoComputadora(puntosJugador);
        
    }

})

btnDetener.addEventListener('click', () => {
    btnDetener.disabled = true;
    btnPedir.disabled = true;
    turnoComputadora(puntosJugadores[0]);
});

btnNuevo.addEventListener('click', () => {
    
    inicializarJuego();
    


})
    return {
        nuevoJuego: inicializarJuego
    };
     
})();

