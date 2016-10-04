(function(){

  angular
  .module('InfiniteEPG')
  .service('devices', devices);

  devices.$inject = ["$http", "authentication", "settings"];   
  function devices ($http, authentication, settings) {

    var getPlaySession = function(instanceID){
      
      return $http.post(settings.getCurrentSandbox().url + "devices/me/playsessions",  "",{
        headers: settings.getSandboxHeaders(),
        params: {instanceId: instanceID}
        });
    };

    
   return {
     getPlaySession : getPlaySession,
    
   };
 }
})();