(function(){

  angular
  .module('InfiniteEPG')
  .service('suggest', suggest);

  suggest.$inject = ["$http", "settings"];   
  function suggest($http, settings) {

    var getSuggestions = function(keyword){
      
      var query = {
        limit : 10,
        q: keyword,
        // type: ltv
      };

      return $http.get(settings.getCurrentSandbox().url + "keywords/suggest",  {
        headers: settings.getSandboxHeaders(),
        params: query
        });
    };

    
   
   return {
     getSuggestions : getSuggestions,
   };
 }
})();