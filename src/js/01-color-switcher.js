function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopStn: document.querySelector('button[data-stop]'),
};
let colorswitcher = null;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopStn.addEventListener('click', onStopBtnClick);

function onStartBtnClick(e) {
  getBodyColor();
  toggleDisabledOnBtns();
  colorswitcher = setInterval(() => {
    getBodyColor();
  }, 1000);
}

function onStopBtnClick(e) {
  clearInterval(colorswitcher);
  toggleDisabledOnBtns();
}

function getBodyColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function toggleDisabledOnBtns() {
  refs.startBtn.toggleAttribute('disabled');
  refs.stopStn.toggleAttribute('disabled');
}
