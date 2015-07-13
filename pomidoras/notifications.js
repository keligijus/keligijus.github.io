tomatoe.notifications = {

  getPermission: function() {

    Notification.requestPermission();

  },

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