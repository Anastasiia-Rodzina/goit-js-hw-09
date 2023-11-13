const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let idColor = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

stopBtn.disabled = true;

startBtn.addEventListener('click', () => {
  disabledBtn(true);

  idColor = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  disabledBtn(false);
  clearInterval(idColor);
});

function disabledBtn(bull) {
  startBtn.disabled = bull;
  stopBtn.disabled = !bull;
}
