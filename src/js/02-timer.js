import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';
import { differenceInMilliseconds } from 'date-fns';

const startBtn = document.querySelector('button[data-start]');
const daysField = document.querySelector('span[data-days]');
const hoursField = document.querySelector('span[data-hours]');
const minutesField = document.querySelector('span[data-minutes]');
const secondsField = document.querySelector('span[data-seconds]');

let targetTime = 0;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    targetTime = selectedDates[0].getTime();

    createPromise()
      .then(targetTime => {
        putOnStartBtn();

        startBtn.addEventListener('click', onStartBtnClick);

        function onStartBtnClick() {
          putOffStartBtn();
          getInterval();
        }
      })
      .catch(error => failureNotify(error));
  },
});

function createPromise() {
  return new Promise((resolve, rejecte) => {
    if (targetTime > Date.now()) {
      resolve(targetTime);
    } else {
      rejecte('Please choose a date in the future');
    }
  });
}

function getInterval() {
  setInterval(() => {
    const currentTime = Date.now();
    const compareTime = differenceInMilliseconds(targetTime, currentTime);
    if (compareTime <= 0) {
      return;
    }
    insertTimerData(compareTime);
  }, 1000);
}

function insertTimerData(compareTime) {
  const { days, hours, minutes, seconds } = convertMs(compareTime);
  daysField.textContent = days;
  hoursField.textContent = hours;
  minutesField.textContent = minutes;
  secondsField.textContent = seconds;
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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function putOnStartBtn() {
  startBtn.removeAttribute('disabled');
}

function putOffStartBtn() {
  startBtn.setAttribute('disabled', true);
}

function failureNotify(error) {
  Notify.failure(error, {
    timeout: 3500,
    position: 'center-top',
  });
}
