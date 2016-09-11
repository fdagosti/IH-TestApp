(function(){

  angular
  .module('InfiniteEPG')
  .service('channels', channels);

  channels.$inject = ["$http", "authentication"];   
  function channels ($http, authentication) {

    var listChannels = function(query){
      return $http.get("https://apx.cisco.com/spvss/infinitehome/infinitetoolkit/v_sandbox_1/channels",  {
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