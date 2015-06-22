tomatoe.helpers = {

  keepTwoDigits: function(minutesOrSeconds) {
    thisValue = minutesOrSeconds.toString();
    if (thisValue.length < 2) {
      thisValue = '0' + thisValue;
    }
    return thisValue;
  }

}