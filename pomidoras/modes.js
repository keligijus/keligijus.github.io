tomatoe.modes = {

  resetTo: {

    timer: function (resetFactor) {
      tomatoe.events.stopSeconds();
      tomatoe.vars.currentButton.style.display = 'none';
      tomatoe.vars.startButton.style.display = 'inline-block';
      tomatoe.vars.startButton.className = 'currentButton';
      tomatoe.vars.currentButton = tomatoe.vars.startButton;
      tomatoe.vars.secondsContainer.innerHTML = tomatoe.vars.secondsVal = tomatoe.vars.secondsDefaultVal;
      tomatoe.vars.minutesContainer.innerHTML = tomatoe.vars.minutesVal = tomatoe.vars.minutesDefaultVal;

      

      if (resetFactor != 'resetFromMemory') {
        tomatoe.localStorage.setVal('secondsVal', tomatoe.vars.secondsDefaultVal);
        tomatoe.localStorage.setVal('minutesVal', tomatoe.vars.minutesDefaultVal);
      }

      tomatoe.vars.currentMode = 'timer';
      tomatoe.localStorage.setVal('currentMode','timer');

      tomatoe.modes.currentMode();
      if (resetFactor != 'resetToZero' && resetFactor != 'resetFromMemory') {
        tomatoe.notifications.theNotification("Alright, get back to focused work!");
        tomatoe.notifications.playSound();
      }

      tomatoe.vars.confirmResetButton.style.display = 'none';
      tomatoe.vars.resetButton.style.display = 'inline-block';
      if (resetFactor == 'resetToZero') {
        tomatoe.events.resetTomatoes();
      }

      document.title = 'Tomatoe Timer | Beta';
    },

    timerRunning: function () {
      tomatoe.events.updateSeconds();
      tomatoe.vars.currentButton.style.display = 'none';
      tomatoe.vars.pauseButton.style.display = 'inline-block';
      tomatoe.vars.pauseButton.className = 'currentButton';
      tomatoe.vars.currentButton = tomatoe.vars.pauseButton;

      tomatoe.vars.confirmResetButton.style.display = 'none';
      tomatoe.vars.resetButton.style.display = 'inline-block';
    },

    timerPaused: function () {
      tomatoe.events.stopSeconds();
      tomatoe.vars.currentButton.style.display = 'none';
      tomatoe.vars.resumeButton.style.display = 'inline-block';
      tomatoe.vars.currentButton = tomatoe.vars.resumeButton;

      tomatoe.vars.confirmResetButton.style.display = 'none';
      tomatoe.vars.resetButton.style.display = 'inline-block';

      document.title = 'Paused - Tomatoe Timer | Beta';
    },

    timerResumed: function () {
      tomatoe.events.stopSeconds();
      tomatoe.events.updateSeconds();
      tomatoe.vars.currentButton.style.display = 'none';
      tomatoe.vars.pauseButton.style.display = 'inline-block';
      tomatoe.vars.currentButton = tomatoe.vars.pauseButton;

      tomatoe.vars.confirmResetButton.style.display = 'none';
      tomatoe.vars.resetButton.style.display = 'inline-block';
    },

    shortBreak: function (resetFactor) {
      tomatoe.events.stopSeconds();
      tomatoe.vars.currentButton.style.display = 'none';
      tomatoe.vars.startShortBreakButton.style.display = 'inline-block';
      tomatoe.vars.startShortBreakButton.className = 'currentButton';
      tomatoe.vars.currentButton = tomatoe.vars.startShortBreakButton;
      tomatoe.vars.secondsContainer.innerHTML = tomatoe.vars.secondsVal = tomatoe.vars.secondsDefaultShortBreakVal;
      tomatoe.vars.minutesContainer.innerHTML = tomatoe.vars.minutesVal = tomatoe.vars.minutesDefaultShortBreakVal;

      

      if (resetFactor != 'resetFromMemory') {
        tomatoe.localStorage.setVal('secondsVal', tomatoe.vars.secondsDefaultShortBreakVal);
        tomatoe.localStorage.setVal('minutesVal', tomatoe.vars.minutesDefaultShortBreakVal);
      }

      tomatoe.vars.currentMode = 'shortBreak';
      tomatoe.localStorage.setVal('currentMode','shortBreak');
      tomatoe.modes.currentMode();

      if (resetFactor != 'resetFromMemory') {
        tomatoe.notifications.theNotification('Take a short break');
        tomatoe.notifications.playSound()
      }

      tomatoe.vars.confirmResetButton.style.display = 'none';
      tomatoe.vars.resetButton.style.display = 'inline-block';
      document.title = 'shortBreak - Tomatoe Timer | Beta';
    },

    longBreak: function (resetFactor) {
      tomatoe.events.stopSeconds();
      tomatoe.vars.currentButton.style.display = 'none';
      tomatoe.vars.startLongBreakButton.style.display = 'inline-block';
      tomatoe.vars.startLongBreakButton.className = 'currentButton';
      tomatoe.vars.currentButton = tomatoe.vars.startLongBreakButton;
      tomatoe.vars.secondsContainer.innerHTML = tomatoe.vars.secondsVal = tomatoe.vars.secondsDefaultLongBreakVal;
      tomatoe.vars.minutesContainer.innerHTML = tomatoe.vars.minutesVal = tomatoe.vars.minutesDefaultLongBreakVal;



      if (resetFactor != 'resetFromMemory') {
        tomatoe.localStorage.setVal('secondsVal', tomatoe.vars.secondsDefaultLongBreakVal);
        tomatoe.localStorage.setVal('minutesVal', tomatoe.vars.minutesDefaultLongBreakVal);
      }

      tomatoe.vars.currentMode = 'longBreak';
      tomatoe.localStorage.setVal('currentMode','longBreak');
      tomatoe.modes.currentMode();

      if (resetFactor != 'resetFromMemory') {
        tomatoe.notifications.theNotification('Take a long break');
        tomatoe.notifications.playSound()
      }

      tomatoe.vars.confirmResetButton.style.display = 'none';
      tomatoe.vars.resetButton.style.display = 'inline-block';
      document.title = 'longBreak - Tomatoe Timer | Beta';
    },

    completed: function (resetFactor) {
      tomatoe.events.stopSeconds();
      tomatoe.vars.currentButton.style.display = 'none';
      tomatoe.vars.restartButton.style.display = 'inline-block';
      tomatoe.vars.currentButton = tomatoe.vars.restartButton;
      tomatoe.vars.secondsContainer.innerHTML = tomatoe.vars.secondsVal = '00';
      tomatoe.vars.minutesContainer.innerHTML = tomatoe.vars.minutesVal = '00';

      if (resetFactor != 'resetFromMemory') {
        tomatoe.localStorage.setVal('secondsVal', '00');
        tomatoe.localStorage.setVal('minutesVal', '00');
      }
      
      tomatoe.vars.currentMode = 'completed';
      tomatoe.localStorage.setVal('currentMode','completed');
      tomatoe.modes.currentMode();

      //track total full tomatoes completed
      if (localStorage.totalFullTomatoesCompleted == undefined) {
        localStorage.totalFullTomatoesCompleted = 1;
      } else {
        localStorage.totalFullTomatoesCompleted = Number(localStorage.totalFullTomatoesCompleted) + 1;
      }

      if (resetFactor != 'resetFromMemory') {
        tomatoe.notifications.theNotification("You've completed a Tomatoe. Go and start another one!");
        tomatoe.notifications.playSound()
      }
      
      tomatoe.vars.confirmResetButton.style.display = 'none';
      tomatoe.vars.resetButton.style.display = 'inline-block';
    }

  },

  currentMode: function () {
    if (tomatoe.vars.currentMode == 'shortBreak' ||
        tomatoe.vars.currentMode == 'longBreak' ||
        tomatoe.vars.currentMode == 'completed') {
      tomatoe.vars.mainContainer.className = 'break';
    }
    else if (tomatoe.vars.currentMode == 'timer') {
      tomatoe.vars.mainContainer.className = 'progress';
    }
  }
}