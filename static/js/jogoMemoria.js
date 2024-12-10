const grid = document.querySelector('.grid');
const timer = document.querySelector('.timer');
const spanJogador = document.querySelector('.nomeJogador'); 
const spanTentativas = document.querySelector('.tentativas');

const characters = [
  'Squid Game',
  'squid game doll',
  'squid Game personagem 067',
  'squid Game personagem 456',
  'Squid Game Lider',
  'squid Game personagem 001',
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let primeiraCarta = '';
let segundaCarta = '';
let tentativas = 0;

const checarFinalGame = () => {
    const cartasAcertadas = document.querySelectorAll('.acertado');

    if (cartasAcertadas.length == 12) {
        clearInterval(this.loop);
        showGameOver();
        
        const tentativas = parseInt(spanTentativas.textContent, 10);
        const tempoFinal = parseInt(timer.textContent, 10);

        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        fetch('/salvar_partida/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': csrfToken 
            },
           body: `tentativas=${encodeURIComponent(tentativas)}&tempo=${encodeURIComponent(tempoFinal)}`
        });
    }
}

const showGameOver = () => {
    const gameOverElement = document.querySelector('.game-over');
    gameOverElement.classList.remove('hidden');
}

const checkCards = () => {
   const firstCharacter = primeiraCarta.getAttribute('data-character');
   const secondCharacter = segundaCarta.getAttribute('data-character');

   if (firstCharacter == secondCharacter) {

    setTimeout(() => {

    primeiraCarta.firstChild.classList.add('acertado');
    segundaCarta.firstChild.classList.add('acertado');

    primeiraCarta = '';
    segundaCarta = '';

    checarFinalGame();
}, 800);

   } else {
    setTimeout(() => {

    primeiraCarta.classList.remove('cartaRevelada');
    segundaCarta.classList.remove('cartaRevelada');

    primeiraCarta = '';
    segundaCarta = '';

    }, 800);
   }
}

const revelarCarta = ({ target }) => {

    if (target.parentNode.className.includes('cartaRevelada')) {
        return;
      
    }

    tentativas++; 
    spanTentativas.textContent = tentativas; 

    if (primeiraCarta == '') {
    target.parentNode.classList.add('cartaRevelada');
    primeiraCarta = target.parentNode;
    } else if (segundaCarta == '') {
    target.parentNode.classList.add('cartaRevelada');
    segundaCarta = target.parentNode;

    checkCards();
    }
}

const createCard = (character) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('/static/images/${character}.jpg')`;

    card.appendChild(front);
    card.appendChild(back);
   
    card.addEventListener('click', revelarCarta);
    card.setAttribute('data-character', character);

    return card;
}

const loadGame = () => {
    const duplicateCharacters = [ ...characters, ...characters ];
    
    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
    });
}

const startTimer = () => {

    this.loop = setInterval(() => {
    const currentTime = Number(timer.innerHTML);
    timer.innerHTML = currentTime + 1;
    }, 1000);
}

window.onload = () => {

    spanJogador.innerHTML = localStorage.getItem('Jogador');
    startTimer();
    loadGame();
}
document.querySelector('.try-again').addEventListener('click', () => {

    location.reload();
});
