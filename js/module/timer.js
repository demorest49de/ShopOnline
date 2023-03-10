export const handleTimer = (deadline) => {
  handleTimerScreenSize();

  const timerBlockDays = document.querySelector('.timer__count.timer-days');
  const timerBlockHour = document.querySelector('.timer__count.timer-hours');
  const timerBlockMinutes = document.querySelector('.timer__count.timer-minutes');
  const timerBlockSeconds = document.querySelector('.timer__count.timer-seconds');

  const getTimeRemaining = () => {
    const dateStop = new Date(deadline).getTime();
    const dateNow = Date.now();
    const timeRemaining = dateStop - dateNow;

    const seconds = Math.floor(timeRemaining / 1000 % 60);
    const minutes = Math.floor(timeRemaining / 1000 / 60 % 60);
    const hours = Math.floor(timeRemaining / 1000 / 60 / 60 % 24);
    const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);


    return {
      timeRemaining,
      seconds,
      minutes,
      hours,
      days,
    };
  };
  const start = () => {
    const timer = getTimeRemaining();

    timerBlockDays.textContent = timer.days.toString();
    timerBlockHour.textContent = timer.hours.toString();
    timerBlockMinutes.textContent = timer.minutes.toString();
    timerBlockSeconds.textContent = timer.seconds.toString();

    const intevalId = setTimeout(start, 1000);

    if (timer.timeRemaining <= 0) {
      timerBlockDays.textContent = '00';
      timerBlockHour.textContent = '00';
      timerBlockMinutes.textContent = '00';
      timerBlockSeconds.textContent = '00';
      clearInterval(intevalId);
    }
  };

  start();
};

export const handleTimerScreenSize = () => {
  const banner = document.querySelector('.item__gallery-notebook');
  // const bannerPromoText = banner.querySelector('.item__text-notebook');

  const allElements = banner.querySelectorAll('.timer__count,.timer__units,.item__text-notebook');
  console.log(': ', allElements);

  allElements.forEach(item => {
    changeSize(item);
  });
};

const changeSize = (item) => {
  const promoFontSize = window.getComputedStyle(item, null).getPropertyValue('font-size');
  const numberOfSize = promoFontSize.match(/\d+/g)[0];
  window.addEventListener('resize', (e) => {
    const screen = e.target.screen;

    if (screen.width <= 645) {
      const reducedSize = Math.floor(numberOfSize - numberOfSize / 100 * 30);
      console.log(': ', reducedSize);
      item.style.fontSize = `${reducedSize}px`;
    } else {
      item.style.fontSize = promoFontSize;
    }
    if (screen.width <= 420) {
      const reducedSize = Math.floor(numberOfSize - numberOfSize / 100 * 50);
      console.log(': ', reducedSize);
      item.style.fontSize = `${reducedSize}px`;
    } else {
      item.style.fontSize = promoFontSize;
    }
  });
};