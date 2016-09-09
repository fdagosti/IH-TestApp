(function(){

  angular
  .module('InfiniteEPG')
  .service('channels', channels);

  channels.$inject = ["$http", "authentication"];   
  function channels ($http, authentication) {

    var listChannels = function(){
      return $http.get("https://apx.cisco.com/spvss/infinitehome/infinitetoolkit/v_sandbox_1/channels",  {
        headers: {
          Authorization: "Bearer "+authentication.getToken()
        }
        });
    };

   
   return {
     listChannels : listChannels,
   };
 }
})();