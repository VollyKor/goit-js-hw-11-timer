import './styles.css';

const clockFaceRef = document.querySelector('#timer-1');
const clockFieldsRef = document.querySelectorAll('.field');

const timeRefs = {
  days: document.querySelector('[data-value="days"]'),
  hours: document.querySelector('[data-value="hours"]'),
  mins: document.querySelector('[data-value="mins"]'),
  secs: document.querySelector('[data-value="secs"]'),
};

class CountdownTimer {
  constructor(finalDate, intervalID = null, isActive = null) {
    (this.finalDate = finalDate),
      (this.intervalID = intervalID),
      (this.isActive = isActive);
  }

  getFinalTime() {
    return new Date(this.finalDate).getTime();
  }

  getDeltaTime() {
    let currentTime = Date.now();
    const deltaTime = this.getFinalTime() - currentTime;
    updateClockface(deltaTime);
  }

  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    this.getDeltaTime()

    this.intervalId = setInterval(() => {
      this.getDeltaTime()
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.isActive = false;
    updateClockface(0);
  }
}

const nextCounter = new CountdownTimer('December 4 2020')
nextCounter.start()

function updateClockface(time) {
  timeRefs.days.textContent = pad(Math.floor(time / (1000 * 60 * 60 * 24)));

  timeRefs.hours.textContent = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  );

  timeRefs.mins.textContent = pad(
    Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)),
  );

  timeRefs.secs.textContent = pad(Math.floor((time % (1000 * 60)) / 1000));
}

function pad(value) {
  return String(value).padStart(2, '0');
}
