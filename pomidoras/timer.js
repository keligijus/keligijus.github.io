var tomatoTimer = {};

tomatoTimer.vars = {
  seconds: document.getElementById('seconds'),
  minutes: document.getElementById('minutes'),
  secondsVal: seconds.innerHTML,
  minutesVal: minutes.innerHTML,
  secondsDefaultVal: '02',
  minutesDefaultVal: '00',
  secondsDefaultShortBreakVal: '00',
  minutesDefaultShortBreakVal: '05',
  secondsDefaultLongBreakVal: '00',
  minutesDefaultLongBreakVal: '15',
  startButton: document.getElementById('start'),
  startShortBreakButton: document.getElementById('startShortBreak'),
  startLongBreakButton: document.getElementById('startLongBreak'),
  pauseButton: document.getElementById('pause'),
  resetButton: document.getElementById('reset'),
  completeTomatoes: 0,
  tomatoesArray: document.getElementById('tomatoes').children
}

tomatoTimer.begin = {

  seconds: function() {
    // tomatoTimer.begin.reduceTime(tomatoTimer.vars.seconds);
    tomatoTimer.secondsInterval = setInterval( function() {

      if (tomatoTimer.vars.secondsVal == 0) {
        tomatoTimer.begin.minutes();
        // console.log(tomatoTimer.vars.secondsVal);
        tomatoTimer.vars.seconds.innerHTML = tomatoTimer.helpers.secondsVal(tomatoTimer.vars.secondsVal);
        tomatoTimer.vars.secondsVal = 59;
        // tomatoTimer.vars.secondsVal -= 1;

      } else {

        // console.log(tomatoTimer.vars.secondsVal);
        tomatoTimer.vars.seconds.innerHTML = tomatoTimer.helpers.secondsVal(tomatoTimer.vars.secondsVal);
        tomatoTimer.vars.secondsVal -= 1;

      }

    } , 1000);  },

  minutes: function() {
    if (tomatoTimer.vars.minutesVal == 0) {
      //stop script
      tomatoTimer.stop.seconds();
      tomatoTimer.tomatoes.update();
    } else {
      tomatoTimer.vars.minutesVal -= 1;
      tomatoTimer.vars.minutes.innerHTML = tomatoTimer.helpers.minutesVal(tomatoTimer.vars.minutesVal);
    }
  },

  shortBreak: function() {
    tomatoTimer.controls.resetToShortBreak();

  }
}

tomatoTimer.stop = {
  seconds: function() {
    clearInterval(tomatoTimer.secondsInterval);
  }
}

tomatoTimer.controls = {

  start: function () {
    tomatoTimer.vars.startButton.addEventListener('click' , tomatoTimer.begin.seconds() );
    tomatoTimer.controls.hideStartButton();
    tomatoTimer.controls.showPauseButton();
  },
    hideStartButton: function () {
      tomatoTimer.vars.startButton.style.display = 'none';
    },
    showStartButton: function () {
      tomatoTimer.vars.startButton.style.display = 'inline-block';
    },
  startShortBreak: function () {
    tomatoTimer.vars.startShortBreakButton.addEventListener('click', tomatoTimer.begin.seconds() );
    tomatoTimer.controls.hideStartShortBreakButton();
    tomatoTimer.controls.showPauseButton();
  },
    hideStartShortBreakButton: function () {
      tomatoTimer.vars.startShortBreakButton.style.display = 'none';
    },
    showStartShortBreakButton: function () {
      tomatoTimer.vars.startShortBreakButton.style.display = 'inline-block';
    }, 
  startLongBreak: function () {
    tomatoTimer.vars.startLongBreakButton.addEventListener('click', tomatoTimer.begin.seconds() );
    tomatoTimer.controls.hideStartLongBreakButton();
    tomatoTimer.controls.showPauseButton();
  },
    hideStartLongBreakButton: function () {
      tomatoTimer.vars.startLongBreakButton.style.display = 'none';
    },
    showStartLongBreakButton: function () {
      tomatoTimer.vars.startLongBreakButton.style.display = 'inline-block';
    },   

  pause: function () {
    tomatoTimer.stop.seconds();
    tomatoTimer.controls.hidePauseButton();
    // tomatoTimer.controls.showStartButton();    
  },
    hidePauseButton: function () {
      tomatoTimer.vars.pauseButton.style.display = 'none';
    },
    showPauseButton: function () {
      tomatoTimer.vars.pauseButton.style.display = 'inline-block';
    },  

  reset: function () {
    tomatoTimer.controls.pause();
    tomatoTimer.vars.secondsVal = tomatoTimer.vars.seconds.innerHTML = tomatoTimer.vars.secondsDefaultVal;
    tomatoTimer.vars.minutesVal = tomatoTimer.vars.minutes.innerHTML = tomatoTimer.vars.minutesDefaultVal;
  },
  resetToShortBreak: function () {
    tomatoTimer.controls.pause();
    tomatoTimer.vars.secondsVal = tomatoTimer.vars.seconds.innerHTML = tomatoTimer.vars.secondsDefaultShortBreakVal;
    tomatoTimer.vars.minutesVal = tomatoTimer.vars.minutes.innerHTML = tomatoTimer.vars.minutesDefaultShortBreakVal;
  }
}

tomatoTimer.helpers = {
  secondsVal: function() {
    //keeps double digits
    thisSeconds = tomatoTimer.vars.secondsVal.toString();
    if (thisSeconds.length < 2) {
      thisSeconds = "0" + thisSeconds;
    }
      return thisSeconds;
    },

  minutesVal: function() {
    //keeps double digits
    thisMinutes = tomatoTimer.vars.minutesVal.toString();
    if (thisMinutes.length < 2) {
      thisMinutes = "0" + thisMinutes;
    }
      return thisMinutes;
    }
}

tomatoTimer.tomatoes = {
  update: function() {
    if (tomatoTimer.vars.completeTomatoes < 4) {
      //add class finished
      tomatoTimer.vars.tomatoesArray[tomatoTimer.vars.completeTomatoes].className = 'finished';
      tomatoTimer.vars.completeTomatoes += 1;
      tomatoTimer.controls.resetToShortBreak();
      tomatoTimer.controls.hidePauseButton();
      tomatoTimer.controls.showStartShortBreakButton();
      }
    else {
      tomatoTimer.tomatoes.resetTomatoes();
    }
  },
  resetTomatoes: function() {
    tomatoTimer.vars.completeTomatoes = 0;
    // todo:
    // remove class finished from all, reset timer
  }
}
