(function(){

  angular
  .module('InfiniteEPG')
  .service('agg', agg);

  agg.$inject = ["$http", "authentication", "settings"];   
  function agg ($http, authentication, settings) {

    var getGrid = function(query){
      
      return $http.get(settings.getCurrentSandbox().url + "agg/grid",  {
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