import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let currentDate = null;
let selectedDate = null;
let intervalId = null;

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
  dataInput: document.querySelector('#datetime-picker'),
};

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', counterOn);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Notify.failure('Please choose a date in the future');
    } else {
      selectedDate = selectedDates[0].getTime();
      refs.startBtn.disabled = false;
    }
  },
};

flatpickr(refs.dataInput, options);

function counterOn() {
  counter.start();
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

const counter = {
  start() {
    intervalId = setInterval(() => {
      currentDate = Date.now();
      const deltaTime = selectedDate - currentDate;
      updateTimer(convertMs(deltaTime));
      refs.startBtn.disabled = true;
      refs.dataInput.disabled = true;

      if (deltaTime <= 1000) {
        this.stop();
      }
    }, 1000);
  },

  stop() {
    refs.startBtn.disabled = true;
    refs.dataInput.disabled = false;
    clearInterval(intervalId);
    return;
  },
};

function updateTimer({ days, hours, minutes, seconds }) {
  refs.dataDays.textContent = `${days}`;
  refs.dataHours.textContent = `${hours}`;
  refs.dataMinutes.textContent = `${minutes}`;
  refs.dataSeconds.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const timer = document.querySelector('.timer');
timer.style.display = 'flex';
timer.style.marginTop = '10px';
timer.style.gap = '10px';
