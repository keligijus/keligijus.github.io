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