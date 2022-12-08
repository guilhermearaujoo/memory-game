/* eslint-disable no-magic-numbers */
/* eslint-disable sonarjs/no-duplicate-string */
import 'animate.css';
import Swal from 'sweetalert2';

const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const playerName = localStorage.getItem('player');
const revealCardString = 'reveal-card';
const timer = document.querySelector('.timer');
const time = {};
const cards = [
  'beth',
  'jerry',
  'jessica',
  'meeseeks',
  'morty',
  'pessoa-passaro',
  'pickle-rick',
  'rick',
  'scroopy',
  'summer',
];
const numberOfCards = cards.length * 2;

const createElementCard = (elementName, elementClass) => {
  const elementHtml = document.createElement(elementName);
  elementHtml.classList.add(...elementClass);
  return elementHtml;
};

const createCard = (character) => {
  const card = createElementCard('div', ['card']);
  const front = createElementCard('div', ['face', 'front']);
  front.style.backgroundImage = `url(src/images/${character}.png)`;
  const back = createElementCard('div', ['face', 'back']);

  card.appendChild(front);
  card.appendChild(back);

  card.setAttribute('data-character', character);
  return card;
};

const shuffle = (array) => {
  const shuffleArray = array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return shuffleArray;
};

let firstCard = '';
let secondCard = '';

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');
    firstCard = '';
    secondCard = '';
  } else {
    setTimeout(() => {
      firstCard.classList.remove(revealCardString);
      secondCard.classList.remove(revealCardString);
      firstCard = '';
      secondCard = '';
    }, 500);
  }
};

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');
  if (disabledCards.length === numberOfCards) {
    clearInterval(time.loop);
    Swal.fire({
      title: `Hey ${playerName}.`,
      text: `You finished in ${timer.innerHTML} seconds`,
      icon: 'success',
      denyButtonText: 'Quit',
      confirmButtonText: 'Again',
      showCancelButton: 'true',
      cancelButtonColor: '#d33',
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  }
};

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes(revealCardString)) return;

  if (firstCard === '') {
    target.parentNode.classList.add(revealCardString);
    firstCard = target.parentNode;
  } else if (secondCard === '') {
    target.parentNode.classList.add(revealCardString);
    secondCard = target.parentNode;
    checkCards();
    checkEndGame();
  }
};

const loadGame = () => {
  const duplicateCards = [...cards, ...cards];
  const shuffleArray = shuffle(duplicateCards);

  shuffleArray.forEach((element) => {
    const card = createCard(element);
    card.addEventListener('click', revealCard);
    grid.appendChild(card);
  });
};

const startTimer = () => {
  time.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
};

window.onload = () => {
  spanPlayer.innerHTML = playerName;
  startTimer();
  loadGame();
};
