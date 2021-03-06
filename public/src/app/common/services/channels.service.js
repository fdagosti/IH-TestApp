(function(){

  angular
  .module('InfiniteEPG')
  .service('channels', channels);

  channels.$inject = ["$http", "settings"];   
  function channels ($http, settings) {

    var listChannels = function(query){
      return $http.get(settings.getCurrentSandbox().url + "channels",  {
        headers: settings.getSandboxHeaders(),
        params: query
        });
    };

   
   return {
     listChannels : listChannels,
   };
 }
})();