(function(){

  angular
  .module('InfiniteEPG')
  .service('agg', agg);

  agg.$inject = ["$http", "authentication", "settings"];   
  function agg ($http, authentication, settings) {

    var getGrid = function(query){
      
      return $http.get(settings.getCurrentSandbox().url + "agg/grid",  {
        headers: settings.getSandboxHeaders(),
        params: query
        });
    };

    var getContent = function(query){

      // is this really useful ????
      var endPoint = query.name ? "content":"agg/content";
      
      return $http.get(settings.getCurrentSandbox().url + endPoint,  {
        headers: settings.getSandboxHeaders(),
        params: query
        });
    };    
   
   return {
     getGrid : getGrid,
     getContent : getContent,
   };
 }
})();