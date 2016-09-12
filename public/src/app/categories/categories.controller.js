((function(){

  angular.module('InfiniteEPG').controller('categoriesListCtrl', function($scope, categories) {
    var vm = this;

    vm.query = {};

    vm.listCategories = function(query){
      vm.categories = null;
      vm.rawData = null;
      categories.listCategories(query)
      .then(function(response){
        vm.categories = response.data.categories;
        vm.rawData = response.data;
      }, function(error){
        vm.error = error.data;
      });
      
    };
    vm.listCategories(null);

    
  });

})());