export const handleTimer = (deadline) => {

  const timerBlockDays = document.querySelector('.timer-days-num');
  const timerBlockHour = document.querySelector('.timer-hours-num');
  const timerBlockMinutes = document.querySelector('.timer-minutes-num');
  const timerBlockSeconds = document.querySelector('.timer-seconds-num');

  const textDays = document.querySelector('.timer-days-text');
  const textHour = document.querySelector('.timer-hours-text');
  const textMinutes = document.querySelector('.timer-minutes-text');
  const textSeconds = document.querySelector('.timer-seconds-text');

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
    // const {days, seconds, timeRemaining, minutes, hours} = timer;
    handleTextDeclension(timer);
    timerBlockDays.textContent = timer.days.toString();
    timerBlockHour.textContent = timer.hours.toString();
    timerBlockMinutes.textContent = timer.minutes.toString();
    timerBlockSeconds.textContent = timer.seconds.toString();

    const intevalId = setTimeout(start, 1000);

    if (timer.timeRemaining <= 0 || isNaN(timer.days)) {
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

  const handleTextDeclension = ({days: day, seconds: sec, minutes: min, hours: hour}) => {
    //исключить интервалы после 5 и до 19

    //подсказка при переборе будем смотреть на последнюю цифру
    const days = [[0, 0, 'дней'], [1, 1, 'день'], [2, 4, 'дня'], [5, 9, 'дней']];

    const hours = [[0, 0, 'часов'], [1, 1, 'час'], [2, 4, 'часа'], [5, 9, 'часов']];
    const minutes = [[0, 0, 'минут'], [1, 1, 'минута'], [2, 4, 'минуты'], [5, 9, 'минут']];
    const seconds = [[0, 0, 'секунд'], [1, 1, 'секунда'], [2, 4, 'секунды'], [5, 9, 'секунд']];
    const exludeRange = [11, 19];

    const currentDate = [[day, days, textDays], [hour, hours, textHour], [min, minutes, textMinutes], [sec, seconds, textSeconds]];


    const getLastDigit = (number) => {
      return number % 10;
    };

    const insideExludeRange = ([left, right], number) => {
      return number >= left && number <= right;
    };

    for (const [number, numAndText, textSelector] of currentDate) {
      if (insideExludeRange(exludeRange, number)) return;
      const digit = getLastDigit(number);
      for (const [left, right, text] of numAndText) {
        if (digit >= left && digit <= right) {
          textSelector.textContent = text;
        }
      }
    }
  };


  start();
};