(function(){

  angular
  .module('InfiniteEPG')
  .service('categories', cats);

  cats.$inject = ["$http", "authentication", "settings"];   
  function cats($http, authentication, settings) {

    var listCategories = function(){
      return $http.get(settings.getCurrentSandbox().url + "categories",  {
        headers: settings.getSandboxHeaders(),
        });
    };

    var getCategory = function(categoryId){
      return $http.get(settings.getCurrentSandbox().url + "categories/"+categoryId,  {
        headers: settings.getSandboxHeaders(),
        });
    };

   
   return {
     listCategories : listCategories,
     getCategory : getCategory,
   };
 }
})();