(function(){

  angular
  .module('InfiniteEPG')
  .service('categories', cats);

  cats.$inject = ["$http", "authentication"];   
  function cats($http, authentication) {

    var listCategories = function(){
      return $http.get("https://apx.cisco.com/spvss/infinitehome/infinitetoolkit/v_sandbox_1/categories",  {
        headers: {
          Authorization: "Bearer "+authentication.getAccessToken()
        },
        });
    };

    var getCategory = function(categoryId){
      return $http.get("https://apx.cisco.com/spvss/infinitehome/infinitetoolkit/v_sandbox_1/categories/"+categoryId,  {
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