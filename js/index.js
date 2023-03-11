import {handleTimer} from "./module/timer.js";

{
  const init = () => {
    const deadline = document.querySelector('.timer').getAttribute('data-deadline');
    handleTimer(deadline);

  };

  init();
}