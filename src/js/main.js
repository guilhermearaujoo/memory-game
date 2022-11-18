import '../css/reset.css';
import '../css/login.css';

const input = document.querySelector('.login__input');
const button = document.querySelector('.login__button');
const form = document.querySelector('.login__form');
const minimunInput = 2;

const verifyData = (string) => string.length > minimunInput;

const validateInput = ({ target }) => {
  if (verifyData(target.value)) {
    button.removeAttribute('disabled');
    return;
  }
  button.setAttribute('disabled', '');
};

const saveLocal = (name) => {
  localStorage.setItem('player', name);
};

const handleSubmit = (event) => {
  event.preventDefault();
  if (verifyData(input.value)) saveLocal(input.value);
  window.location = '/game.html';
};

input.addEventListener('keyup', validateInput);
form.addEventListener('submit', handleSubmit);
