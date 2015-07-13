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
  notificationPermission: false,

  updateDefaultModesLengthForm: document.getElementById('updateDefaultModesLength')

}