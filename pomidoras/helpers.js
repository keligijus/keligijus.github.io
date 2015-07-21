tomatoe.helpers = {

  keepTwoDigits: function(minutesOrSeconds) {
    thisValue = minutesOrSeconds.toString();
    if (thisValue.length < 2) {
      thisValue = '0' + thisValue;
    }
    return thisValue;
  },

  updateTimerValues: function(minutesOrSeconds) {
<<<<<<< HEAD
      // if (localStorage[variable]) {
        var variable = minutesOrSeconds + 'Val',
            variableContainer =  minutesOrSeconds + 'Container';
        tomatoe.vars[variable] = localStorage[variable]; 
        tomatoe.vars[variableContainer].innerHTML = localStorage[variable];
      // }
=======
    var variable = minutesOrSeconds + 'Val',
        variableContainer =  minutesOrSeconds + 'Container';
    tomatoe.vars[variable] = localStorage[variable]; 
    tomatoe.vars[variableContainer].innerHTML = localStorage[variable];
>>>>>>> b397f490db0e7e3199ac7117c4c029884f5c83a4
  }

}