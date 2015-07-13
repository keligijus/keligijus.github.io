var tomatoe = {
  init: function () {
    tomatoe.localStorage.init();

    //these should be added inside localStorage.init(), but at the moment I can't make them work
    tomatoe.helpers.updateTimerValues('minutes');
    tomatoe.helpers.updateTimerValues('seconds');
    
    item = document.getElementsByTagName('body')[0];
    item.className = 'anim-visible';

    tomatoe.notifications.getPermission();
  }
};