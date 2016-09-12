(function(){

  angular
  .module('InfiniteEPG')
  .service('agg', agg);

  agg.$inject = ["$http", "authentication"];   
  function agg ($http, authentication) {

    var getGrid = function(query){
      
      return $http.get("https://apx.cisco.com/spvss/infinitehome/infinitetoolkit/v_sandbox_1/agg/grid",  {
        headers: {
          Authorization: "Bearer "+authentication.getAccessToken()
        },
        params: query
        });
    };

    
   
   return {
     getGrid : getGrid,
   };
 }
})();