(function(){

  angular
  .module('InfiniteEPG')
  .service('adsuite', adsuite);

  adsuite.$inject = ["$window","$http"];   
  function adsuite($window, $http) {

    var _adSuiteSettings = {
      enabled : false,
      baseUrl: "http://spvss-adsuite.cisco.com/manifestManager",
      currentUser:"bob",
      users: [
      "bob", "elsa"
      ]
    };

    var getStatus = function(){

      // The AdSuite status API does not return JSon, and $http is trying to transform it into JSON
      // So we override the behavior
      return $http({
        url: _adSuiteSettings.baseUrl+"/status",
        method: 'GET',
        transformResponse: function(value) {
          return value;
        }
      });
      
    };

    var enable = function(flag){
      _adSuiteSettings.enabled = flag;
      _saveAdsuiteSettings();
    };

    var isEnabled = function(){
      getSettings();
      return _adSuiteSettings.enabled;
    };

    var createAdSession = function(sourceUrl){
      var randomSession = Math.floor(Math.random()*10000000);
      if (sourceUrl.startsWith("https://")){
        sourceUrl = sourceUrl.substring(8);
      }else if (sourceUrl.startsWith("http://")){
        sourceUrl = sourceUrl.substring(7);
      }
      return $http.post(_adSuiteSettings.baseUrl+"/session/"+randomSession+"/adRules", "",{
        params: {
          contentInstanceId : "programid://lasvegas",
          deviceId: "randomName",
          playUrl: sourceUrl,
          subscriberId: _adSuiteSettings.currentUser
        }
      });
    };

    var setCurrentUser = function(user){
      _adSuiteSettings.currentUser = user;
      _saveAdsuiteSettings();
    };

    var _saveAdsuiteSettings = function() {
      $window.localStorage["InfiniteEPG-adsuite-settings"] = JSON.stringify(_adSuiteSettings);
    };  

    var getSettings = function(){
      var savedSettings = $window.localStorage["InfiniteEPG-adsuite-settings"];
      if (savedSettings){
          _adSuiteSettings = JSON.parse(savedSettings);
      }
      return _adSuiteSettings;
    };
    
   return {
     
     getStatus: getStatus,
     isEnabled: isEnabled,
     enable: enable,
     getSettings: getSettings,
     setCurrentUser: setCurrentUser,
     createAdSession: createAdSession,
     
   };
 }
})();