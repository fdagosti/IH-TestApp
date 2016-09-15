(function(){

  angular
  .module('InfiniteEPG')
  .service('channels', channels);

  channels.$inject = ["$http", "authentication", "settings"];   
  function channels ($http, authentication, settings) {

    var listChannels = function(query){
      return $http.get(settings.getCurrentSandbox().url + "channels",  {
        headers: {
          Authorization: "Bearer "+authentication.getAccessToken()
        },
        params: query
        });
    };

   
   return {
     listChannels : listChannels,
   };
 }
})();