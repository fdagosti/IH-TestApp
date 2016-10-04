(function(){

  angular
  .module('InfiniteEPG')
  .service('pins', pins);

  pins.$inject = ["$http", "settings", "$uibModal"];   
  function pins ($http, settings, $uibModal) {

    var getStatus = function(query){
      return $http.get(settings.getCurrentSandbox().url + "household/me/pins/parental/status", {
        headers: settings.getSandboxHeaders(),
        params: query
        });
    };

    var checkPin = function(code){
      var data = {
        "pin": code,
      };

      return $http.post(settings.getCurrentSandbox().url + "household/me/pins/parental", data, {
        headers: settings.getSandboxHeaders()
      });
    };

    var getModalPin = function(){
      return $uibModal.open({
          templateUrl: "src/app/pin/pin.template.html",
          controller: "pinCtrl as vm"
      });
    };

   
   return {
     getStatus : getStatus,
     checkPin : checkPin,
     getModalPin : getModalPin,
   };
 }
})();