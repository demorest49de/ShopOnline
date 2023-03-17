export const handleTimer = () => {
  const changeBannerPromoText = () => {
    const timerPromoText = document.querySelector('.item__text-notebook');
    timerPromoText.textContent = 'ноутбуки - всегда отличный подарок';
    timerPromoText.classList.add('item__text-notebook-changed');
    const itemGallery = timerPromoText.closest('.item__gallery-notebook');
    itemGallery.classList.add('item__gallery-notebook-changed');
  };

  const deadline = document.querySelector('.timer');
  if (deadline) {
    const hasDeadlineAttr = deadline.hasAttribute('data-timer-deadline');
    if (hasDeadlineAttr) {
      deadline.insertAdjacentHTML('beforeend', `
        <p class="timer__title">До конца акции:</p>
        <div class="timer__block">
          <p><span class="timer__count timer-days-num">00&nbsp;
          </span><span class="timer__units  timer-days-text">дней</span></p>
          <p><span class="timer__count timer-hours-num">00&nbsp;
          </span><span class="timer__units  timer-hours-text">часов</span></p>
          <p><span class="timer__count timer-minutes-num">00&nbsp;
          </span><span class="timer__units  timer-minutes-text">минут</span></p>
          <p><span class="timer__count timer-seconds-num">00&nbsp;
          </span><span class="timer__units  timer-seconds-text">секунд</span></p>
        </div>
      `);
    }
  } else {
    changeBannerPromoText();
    return;
  }

  const deadlineAttr = deadline.getAttribute('data-timer-deadline');
  const timerBlockDays = document.querySelector('.timer-days-num');
  const timerBlockHour = document.querySelector('.timer-hours-num');
  const timerBlockMinutes = document.querySelector('.timer-minutes-num');
  const timerBlockSeconds = document.querySelector('.timer-seconds-num');

  const textDays = document.querySelector('.timer-days-text');
  const textHour = document.querySelector('.timer-hours-text');
  const textMinutes = document.querySelector('.timer-minutes-text');
  const textSeconds = document.querySelector('.timer-seconds-text');

  const getTimeRemaining = () => {
    const dateStop = new Date(deadlineAttr).getTime();
    const dateNow = Date.now();

    const timezoneoffset = Math.abs(new Date().getTimezoneOffset()) * 60 * 1000;
    const myTimeZone = (+3) * 60 * 60 * 1000;

    const myCurrentTime = dateNow - timezoneoffset + myTimeZone;

    const timeRemaining = dateStop - myCurrentTime;
    // const timeRemaining = dateStop - dateNow;

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

  const handleTextDeclension =
    ({days: day, seconds: sec, minutes: min, hours: hour}) => {
      const days = [[0, 0, 'дней'], [1, 1, 'день'],
        [2, 4, 'дня'], [5, 9, 'дней']];

      const hours = [[0, 0, 'часов'], [1, 1, 'час'],
        [2, 4, 'часа'], [5, 9, 'часов']];
      const minutes = [[0, 0, 'минут'], [1, 1, 'минута'],
        [2, 4, 'минуты'], [5, 9, 'минут']];
      const seconds = [[0, 0, 'секунд'], [1, 1, 'секунда'],
        [2, 4, 'секунды'], [5, 9, 'секунд']];
      const exludeRange = [11, 19];

      const currentDate = [[day, days, textDays], [hour, hours, textHour],
        [min, minutes, textMinutes], [sec, seconds, textSeconds]];


      const getLastDigit = (number) => number % 10;

      const insideExludeRange = ([left, right], number) =>
        number >= left && number <= right;

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

  const start = () => {
    const timer = getTimeRemaining();
    handleTextDeclension(timer);


    timer.days === 0 ? timerBlockDays.closest('p').remove() :
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
      clearTimeout(intevalId);
      const timer = document.querySelector('.timer');
      timer.remove();
      changeBannerPromoText();
    }
  };


  start();
};
