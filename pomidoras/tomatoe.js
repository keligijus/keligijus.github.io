var tomatoe = {
  init: function () {
<<<<<<< HEAD

    if (localStorage.length > 0) {
      tomatoe.localStorage.init();

      //these should be added inside localStorage.init(), but at the moment I can't make them work

      if (localStorage.minutesVal && localStorage.secondsVal) {
        tomatoe.helpers.updateTimerValues('seconds');
        tomatoe.helpers.updateTimerValues('minutes');
      }
    }
=======
    tomatoe.localStorage.init();

    //these should be added inside localStorage.init(), but at the moment I can't make them work
    tomatoe.helpers.updateTimerValues('minutes');
    tomatoe.helpers.updateTimerValues('seconds');
>>>>>>> b397f490db0e7e3199ac7117c4c029884f5c83a4
    
    item = document.getElementsByTagName('body')[0];
    item.className = 'anim-visible';

    tomatoe.notifications.getPermission();
  }
};