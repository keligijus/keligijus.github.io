      tomatoe.vars.currentButton[0].style.display = 'none';
      tomatoe.vars.startButton.style.display = 'inline-block';
      tomatoe.vars.startButton.className = 'currentButton';
      tomatoe.vars.currentButton = tomatoe.vars.startButton;
      tomatoe.vars.secondsContainer.innerHTML = tomatoe.vars.secondsVal = tomatoe.vars.secondsDefaultVal;
      tomatoe.vars.minutesContainer.innerHTML = tomatoe.vars.minutesVal = tomatoe.vars.minutesDefaultVal;


tomatoe.settings.updateDefaultModeLength('secondsDefaultVal');

tomatoe.settings.updateDefaultModeLength()