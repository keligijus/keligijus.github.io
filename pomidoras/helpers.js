tomatoe.helpers = {

  keepTwoDigits: function(minutesOrSeconds) {
    thisValue = minutesOrSeconds.toString();
    if (thisValue.length < 2) {
      thisValue = '0' + thisValue;
    }
    return thisValue;
  },

  updateTimerValues: function(minutesOrSeconds) {
      // if (localStorage[variable]) {
        var variable = minutesOrSeconds + 'Val',
            variableContainer =  minutesOrSeconds + 'Container';
        tomatoe.vars[variable] = localStorage[variable]; 
        tomatoe.vars[variableContainer].innerHTML = localStorage[variable];
      // }
  }

}