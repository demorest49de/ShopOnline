export const handleTimer = (deadline) => {

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

    handleTextDeclension(timer);

    const intevalId = setTimeout(start, 1000);

    if (timer.timeRemaining <= 0) {
      timerBlockDays.textContent = '00';
      timerBlockHour.textContent = '00';
      timerBlockMinutes.textContent = '00';
      timerBlockSeconds.textContent = '00';
      clearInterval(intevalId);
      const timer = document.querySelector('.timer');
      timer.remove();
      const timerPromoText = document.querySelector('.item__text-notebook');
      timerPromoText.textContent = 'ноутбуки - всегда отличный подарок';
      timerPromoText.classList.add('item__text-notebook-changed');
      const itemGallery = timerPromoText.closest('.item__gallery-notebook');
      itemGallery.classList.add('item__gallery-notebook-changed');
    }
  };

  start();
};

const handleTextDeclension = (timer) => {

};