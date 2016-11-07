(function(){

  angular
  .module('InfiniteEPG')
  .service('categories', cats);

  cats.$inject = ["$http", "authentication", "settings"];   
  function cats($http, authentication, settings) {

    var listCategories = function(){
      return $http.get(settings.getCurrentSandbox().url + "categories",  {
        headers: settings.getSandboxHeaders(),
        }).then(function(response){
          console.log("categories ", response.data.categories);
          _correctLinks(response.data.categories);
          return response;
        });
    };

    // links are buggy as they do not include the full category Id
    // We are correcting this at this level temporarily
    var _correctLinks = function(cats){
      for (var i = 0; i < cats.length; i++) {
        var cat = cats[i];
        var id = cat.id;
        if (cat._links.self){
          cat._links.self.href = "/categories/"+id;
        }
        if (cat._links.content){
          cat._links.content.href = "/content?categoryId="+id;
        }
      }
    };

    var getCategory = function(categoryId){
      return $http.get(settings.getCurrentSandbox().url + "categories/"+categoryId,  {
        headers: settings.getSandboxHeaders(),
        }).then(function(response){
          console.log("categories ", response.data.categories);
          _correctLinks(response.data.categories);
          return response;
        });
    };

   
   return {
     listCategories : listCategories,
     getCategory : getCategory,
   };
 }
})();