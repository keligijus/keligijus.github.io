tomatoe.events = {

  hideButton: function (button) {
    button.style.display = 'none';
  },

  showButton: function (button) {
    button.style.display = 'inline-block';
  },

  updateSeconds: function () {

    // tomatoe.begin.reduceTime(tomatoe.vars.seconds);
    tomatoe.secondsInterval = setInterval( function() {

      if (tomatoe.vars.secondsVal == 0 || tomatoe.vars.secondsVal == '00') {
        tomatoe.vars.secondsVal = 59;
        tomatoe.events.updateMinutes();
        tomatoe.vars.secondsContainer.innerHTML = tomatoe.helpers.keepTwoDigits(tomatoe.vars.secondsVal);
        tomatoe.localStorage.setVal('secondsVal', tomatoe.helpers.keepTwoDigits(tomatoe.vars.secondsVal));
        // tomatoe.vars.secondsVal -= 1;

      } else {

        // console.log(tomatoe.vars.secondsVal);
        tomatoe.vars.secondsVal -= 1;
        tomatoe.vars.secondsContainer.innerHTML = tomatoe.helpers.keepTwoDigits(tomatoe.vars.secondsVal);
        tomatoe.localStorage.setVal('secondsVal', tomatoe.helpers.keepTwoDigits(tomatoe.vars.secondsVal));
      }

    } , 1000);    
  },

  stopSeconds: function () {
    clearInterval(tomatoe.secondsInterval);
  },

  updateMinutes: function () {
    if (tomatoe.vars.minutesVal == 0) {
      //stop script
      tomatoe.events.stopSeconds();
      if (tomatoe.vars.currentMode == 'shortBreak' || tomatoe.vars.currentMode == 'longBreak'){
            tomatoe.events.updateTomatoe();
          }
      tomatoe.events.resetMode();
    } else {
      tomatoe.vars.minutesVal -= 1;
      tomatoe.vars.minutesContainer.innerHTML = tomatoe.helpers.keepTwoDigits(tomatoe.vars.minutesVal);
      tomatoe.localStorage.setVal('minutesVal', tomatoe.helpers.keepTwoDigits(tomatoe.vars.minutesVal));
    }    
  },

  updateTomatoe: function() {
    // if (tomatoe.vars.completeTomatoes < 3) {
      //add class finished
      tomatoe.vars.tomatoesArray[tomatoe.vars.completeTomatoes].className = 'finished';
      tomatoe.vars.completeTomatoes += 1;
      tomatoe.localStorage.setVal('completeTomatoes',tomatoe.vars.completeTomatoes);
      
      // }
    // else {
      // this to be launched only on reset
      // tomatoe.events.resetTomatoes();
      // }
    },

  resetTomatoes: function() {
    tomatoe.vars.completeTomatoes = 0;
    tomatoe.localStorage.setVal('completeTomatoes',0);
    // remove class finished from all, reset timer
    for (i=0; i<tomatoe.vars.tomatoesArray.length;i++){
      tomatoe.vars.tomatoesArray[i].className = '';
    }
  },

  resetMode: function() {
    if (tomatoe.vars.currentMode == 'timer') {
      if (tomatoe.vars.completeTomatoes < 3) {
      tomatoe.modes.resetTo.shortBreak();
      }
      else if (tomatoe.vars.completeTomatoes == 3) {
        tomatoe.modes.resetTo.longBreak();
      }
      else if (tomatoe.vars.completeTomatoes == 4) {
        //ability to reset to begining
      }
    }
    else if (tomatoe.vars.currentMode == 'shortBreak') {
      tomatoe.modes.resetTo.timer();
    }
    else if (tomatoe.vars.currentMode == 'longBreak') {
      tomatoe.modes.resetTo.completed();
    }
  },

  confirmReset: function(confirmation) {
    if (confirmation == 'areYouSure') {
      tomatoe.vars.resetButton.style.display = 'none';
      tomatoe.vars.confirmResetButton.style.display = 'inline-block';
      document.getElementById('reset-container').className += ' move-down';
      document.getElementById('easter-egg').className = 'anim-visible';
    }
    else if (confirmation == 'yesIam') {
      tomatoe.modes.resetTo.timer('resetToZero');
      tomatoe.vars.confirmResetButton.style.display = 'none';
      tomatoe.vars.resetButton.style.display = 'inline-block';
      document.getElementById('reset-container').className = 'reset';
      document.getElementById('easter-egg').className = 'anim-hidden';
      tomatoe.settings.hideContainer();
    }
  }


}