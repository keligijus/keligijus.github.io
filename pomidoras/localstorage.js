tomatoe.localStorage = {

  init: function() {
    if (localStorage.length > 0) {

      console.group('LocalStorage:');
        for (var i = 0; i < localStorage.length; i++) {
          key = localStorage.key(i);
          // value = localStorage.getItem(localStorage.key(i));
          tomatoe.localStorage.updateFromLocal(key);
          //reset to required mode and update visuals
          // tomatoe.modes.resetTo.timer(resetFromLocal);
          console.log(i + "|  Key: " + key +", Value: " + localStorage.getItem(localStorage.key(i)));
        };
      console.groupEnd();

      //NOTE: Reset to mode      
      var currentMode = localStorage.currentMode;
      tomatoe.modes.resetTo[currentMode]('resetFromMemory');
      
      //NOTE: Update complete Tomotatoes
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
