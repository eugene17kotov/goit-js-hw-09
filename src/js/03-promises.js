import { Notify } from 'notiflix';
const form = document.querySelector('.form');

form.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();

  let delay = Number(form.elements.delay.value);
  const step = Number(form.elements.step.value);
  const amount = Number(form.elements.amount.value);

  promisesCycle(delay, step, amount);
  form.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function promisesCycle(delay, step, amount) {
  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => succesNotify(position, delay))
      .catch(({ position, delay }) => failureNotify(position, delay));
    delay += step;
  }
}

function succesNotify(position, delay) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
    clickToClose: true,
    useIcon: false,
  });
}

function failureNotify(position, delay) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
    clickToClose: true,
    useIcon: false,
  });
}
