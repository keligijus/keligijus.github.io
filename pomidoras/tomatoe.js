var tomatoe = {
  init: function () {
    item = document.getElementsByTagName('body')[0];
    item.className = 'anim-visible';
  }
}

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

tomatoe.helpers = {

  keepTwoDigits: function(minutesOrSeconds) {
    thisValue = minutesOrSeconds.toString();
    if (thisValue.length < 2) {
      thisValue = '0' + thisValue;
    }
    return thisValue;
  }

}

tomatoe.localStorage = {

  init: function() {
    if (localStorage.length > 0) {
      for (var i = 0; i < localStorage.length; i++) {
        key = localStorage.key(i);
        // value = localStorage.getItem(localStorage.key(i));
        tomatoe.localStorage.updateFromLocal(key);
        //reset to required mode and update visuals
        // tomatoe.modes.resetTo.timer(resetFromLocal);
        console.log(i + " | Key: " + key +", Value: " + localStorage.getItem(localStorage.key(i)));
      };
      currentMode = localStorage.currentMode;
      tomatoe.modes.resetTo[currentMode](); //TODO: reset without message
      
      for (var j = 0; j < tomatoe.vars.completeTomatoes; j++) {
        tomatoe.vars.tomatoesArray[j].className = 'finished';
      }
    }
  },

  setVal: function(theVar, value) {
    localStorage[theVar] = value;
    return localStorage[theVar];
  },

  updateFromLocal: function(theVar) {
    tomatoe.vars[theVar] = localStorage[theVar];
    return tomatoe.vars[theVar];
  }
}

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
      tomatoe.localStorage.setVal('secondsVal', tomatoe.vars.secondsDefaultVal);
      tomatoe.localStorage.setVal('minutesVal', tomatoe.vars.minutesDefaultVal);


      tomatoe.vars.currentMode = 'timer';
      tomatoe.localStorage.setVal('currentMode','timer');

      tomatoe.modes.currentMode();
      if (resetFactor != 'resetToZero') {
        tomatoe.notifications.theNotification("Alright, get back to focused work!");
        tomatoe.notifications.playSound();
      }

      tomatoe.vars.confirmResetButton.style.display = 'none';
      tomatoe.vars.resetButton.style.display = 'inline-block';
      if (resetFactor == 'resetToZero') {
        tomatoe.events.resetTomatoes();
      }
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
    },

    timerResumed: function () {
      tomatoe.events.stopSeconds();
      tomatoe.events.updateSeconds();
      tomatoe.vars.resumeButton.style.display = 'none';
      tomatoe.vars.currentButton.style.display = 'inline-block';

      tomatoe.vars.confirmResetButton.style.display = 'none';
      tomatoe.vars.resetButton.style.display = 'inline-block';
    },

    shortBreak: function () {
      tomatoe.events.stopSeconds();
      tomatoe.vars.currentButton.style.display = 'none';
      tomatoe.vars.startShortBreakButton.style.display = 'inline-block';
      tomatoe.vars.startShortBreakButton.className = 'currentButton';
      tomatoe.vars.currentButton = tomatoe.vars.startShortBreakButton;
      tomatoe.vars.secondsContainer.innerHTML = tomatoe.vars.secondsVal = tomatoe.vars.secondsDefaultShortBreakVal;
      tomatoe.vars.minutesContainer.innerHTML = tomatoe.vars.minutesVal = tomatoe.vars.minutesDefaultShortBreakVal;
      tomatoe.localStorage.setVal('secondsVal', tomatoe.vars.secondsDefaultShortBreakVal);
      tomatoe.localStorage.setVal('minutesVal', tomatoe.vars.minutesDefaultShortBreakVal);

      tomatoe.vars.currentMode = 'shortBreak';
      tomatoe.localStorage.setVal('currentMode','shortBreak');
      tomatoe.modes.currentMode();

      tomatoe.notifications.theNotification('Take a short break');
      tomatoe.notifications.playSound()

      tomatoe.vars.confirmResetButton.style.display = 'none';
      tomatoe.vars.resetButton.style.display = 'inline-block';
    },

    longBreak: function () {
      tomatoe.events.stopSeconds();
      tomatoe.vars.currentButton.style.display = 'none';
      tomatoe.vars.startLongBreakButton.style.display = 'inline-block';
      tomatoe.vars.startLongBreakButton.className = 'currentButton';
      tomatoe.vars.currentButton = tomatoe.vars.startLongBreakButton;
      tomatoe.vars.secondsContainer.innerHTML = tomatoe.vars.secondsVal = tomatoe.vars.secondsDefaultLongBreakVal;
      tomatoe.vars.minutesContainer.innerHTML = tomatoe.vars.minutesVal = tomatoe.vars.minutesDefaultLongBreakVal;
      tomatoe.localStorage.setVal('secondsVal', tomatoe.vars.secondsDefaultLongBreakVal);
      tomatoe.localStorage.setVal('minutesVal', tomatoe.vars.minutesDefaultLongBreakVal);

      tomatoe.vars.currentMode = 'longBreak';
      tomatoe.localStorage.setVal('currentMode','longBreak');
      tomatoe.modes.currentMode();

      tomatoe.notifications.theNotification('Take a long break');
      tomatoe.notifications.playSound()

      tomatoe.vars.confirmResetButton.style.display = 'none';
      tomatoe.vars.resetButton.style.display = 'inline-block';
    },

    completed: function () {
      tomatoe.events.stopSeconds();
      tomatoe.vars.currentButton.style.display = 'none';
      tomatoe.vars.restartButton.style.display = 'inline-block';
      tomatoe.vars.currentButton = tomatoe.vars.restartButton;
      tomatoe.vars.secondsContainer.innerHTML = tomatoe.vars.secondsVal = '00';
      tomatoe.vars.minutesContainer.innerHTML = tomatoe.vars.minutesVal = '00';
      tomatoe.localStorage.setVal('secondsVal', '00');
      tomatoe.localStorage.setVal('minutesVal', '00');

      tomatoe.vars.currentMode = 'completed';
      tomatoe.localStorage.setVal('currentMode','completed');
      tomatoe.modes.currentMode();

      //track total full tomatoes completed
      if (localStorage.totalFullTomatoesCompleted == undefined) {
        localStorage.totalFullTomatoesCompleted = 1;
      } else {
        localStorage.totalFullTomatoesCompleted = Number(localStorage.totalFullTomatoesCompleted) + 1;
      }

      tomatoe.notifications.theNotification("You've completed a Tomatoe. Go and start another one!");
      tomatoe.notifications.playSound()

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

tomatoe.notifications = {

  theNotification: function(theNotificationTitle) {

    //use server https://www.npmjs.com/package/local-web-server

    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification. Be a sport and get a proper browser.');
    }

    else if (Notification.permission === 'granted') {
      var notification = new Notification(theNotificationTitle,{
        icon: 'images/tomatoe.png',
        body: 'Click to return to the Timer'
      });
      notification.onshow = function() {
        setTimeout(notification.close.bind(notification), 5000);
      }
      notification.onclick = function() {
        window.focus();
      }
    }

    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        if (permission === 'granted') {
          var notification = new Notification(theNotificationTitle,{
            icon: 'images/tomatoe.png',
            body: 'Click to return to the Timer'
          });
          notification.onshow = function() {
            setTimeout(notification.close.bind(notification), 5000);
          }
          notification.onclick = function() {
            window.focus();
          }
        }
      });
    }
  },

  playSound: function() {
    var boingSound = new Audio('sounds/bounce.mp3');
    boingSound.play();
  }
}

tomatoe.settings = {

  toggleVisibility: function () {
    tomatoe.vars.settingsContainer.classList.toggle('hidden');
    tomatoe.vars.mainContainer.addEventListener('click', tomatoe.settings.visibilityListener);
    tomatoe.settings.updateDefaultModeLength();
  },

  visibilityListener: function() {
    tomatoe.settings.hideContainer();
  },

  hideContainer: function () {
    tomatoe.vars.settingsContainer.classList.add('hidden');
    tomatoe.vars.mainContainer.removeEventListener('click', tomatoe.settings.visibilityListener);
  },

  updateDefaultModeLength: function () {

    inputFieldsArr = tomatoe.vars.updateDefaultModesLengthForm.getElementsByTagName('input');

    //set Values as per matching variables
    for (i = inputFieldsArr.length - 1; i >= 0; i--) {
      theVariable = inputFieldsArr[i].name;
      inputFieldsArr[i].value = tomatoe.vars[theVariable];
    }

    for (i = inputFieldsArr.length - 1; i >= 0; i--) {

      inputFieldsArr[i].addEventListener('focusout' , function() {
        theVariable2 = this.name;
        tomatoe.vars[theVariable2] = tomatoe.helpers.keepTwoDigits(this.value);


      });
    };

    // 1. Event listener on exit input --done
    // 2. Upon event uptade html and variables  --done
      // longBreakLengthForm.children[1].placeholder --done
    // 3. Inform user about the update (message and pulse animation) TODO

  },

  resetToDefaults: function() {
    tomatoe.settings.hideContainer();
    tomatoe.modes.resetTo.timer('resetToZero');
  }
}

tomatoe.vars = {

  // properties 
  mainContainer: document.getElementsByTagName('main')[0],
  secondsContainer: document.getElementById('seconds'),
  minutesContainer: document.getElementById('minutes'),
  secondsVal: document.getElementById('seconds').innerHTML,
  minutesVal: document.getElementById('minutes').innerHTML,
  secondsDefaultVal: '00',
  minutesDefaultVal: '25',
  secondsDefaultShortBreakVal: '00',
  minutesDefaultShortBreakVal: '05',
  secondsDefaultLongBreakVal: '00',
  minutesDefaultLongBreakVal: '10',
    secondsHardcodedVal: '00',
    minutesHardcodedVal: '25',
    secondsHardcodedShortBreakVal: '00',
    minutesHardcodedShortBreakVal: '05',
    secondsHardcodedLongBreakVal: '00',
    minutesHardcodedLongBreakVal: '10',
  startButton: document.getElementById('start'),
  startShortBreakButton: document.getElementById('startShortBreak'),
  startLongBreakButton: document.getElementById('startLongBreak'),
  pauseButton: document.getElementById('pause'),
  restartButton: document.getElementById('restart'),
  resumeButton: document.getElementById('resume'),
  completeTomatoes: 0,
  tomatoesArray: document.getElementById('tomatoes').children,
  currentButton: document.getElementsByClassName('current-button')[0],
  currentMode: 'timer',

  //settings
  settingsContainer: document.getElementsByClassName('settings-container')[0],
  resetButton: document.getElementById('reset'),
  confirmResetButton: document.getElementById('confirm-reset'),

  updateDefaultModesLengthForm: document.getElementById('updateDefaultModesLength')

}