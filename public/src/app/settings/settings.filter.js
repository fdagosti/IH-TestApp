(function(){

  angular
    .module('InfiniteEPG')
    .filter('settingsFilter', settingsFilter);
  
  angular
    .module('InfiniteEPG')
    .filter('settingsValueFilter', settingsValueFilter);
  

    var settings = {
      "uiLanguage": "Interface Language",
      "audioLanguage": "Audio Language",
      "subtitlesLanguage": "Subtitles Language",
      "presentSubtitles": "Display Subtitles",
      "displayName": "Profile Name",
      "parentalRatingThreshold": "Parental Rating Level",
      "favoriteChannels": "Favorite Channels",
    };

  var settingsValue = {
    "eng": "English",
    "false": "False",
    "Home": "Home",
  };

  function settingsFilter() {
    return function (settingsName) {
      return settings[settingsName];
    };
  }

  function settingsValueFilter() {
    return function(settingValue){
      if (settingsValue[settingValue]){
        return settingsValue[settingValue];
      }
      return settingValue;
    };
  }
})();