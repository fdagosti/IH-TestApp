(function(){

  angular
  .module('InfiniteEPG')
  .service('categories', cats);

  cats.$inject = ["$http", "authentication", "settings"];   
  function cats($http, authentication, settings) {

    var listCategories = function(){
      return $http.get(settings.getCurrentSandbox().url + "categories",  {
        headers: {
          Authorization: "Bearer "+authentication.getAccessToken()
        },
        });
    };

    var getCategory = function(categoryId){
      return $http.get(settings.getCurrentSandbox().url + "categories/"+categoryId,  {
        headers: {
          Authorization: "Bearer "+authentication.getAccessToken()
        },
        });
    };

   
   return {
     listCategories : listCategories,
     getCategory : getCategory,
   };
 }
})();