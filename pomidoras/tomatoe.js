var tomatoe = {
  init: function () {

    if (localStorage.length > 0) {
      tomatoe.localStorage.init();

      //these should be added inside localStorage.init(), but at the moment I can't make them work

      if (localStorage.minutesVal && localStorage.secondsVal) {
        tomatoe.helpers.updateTimerValues('seconds');
        tomatoe.helpers.updateTimerValues('minutes');
      }
    }
    
    item = document.getElementsByTagName('body')[0];
    item.className = 'anim-visible';

    tomatoe.notifications.getPermission();
  }
};