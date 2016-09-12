((function(){

  angular.module('InfiniteEPG').controller('categoryCtrl', function($scope, $routeParams, categories) {
    var vm = this;

    vm.query = {};

    vm.categoryId = $routeParams.categoryId;
    vm.getCategory = function(categoryId){
      vm.category = null;
      vm.rawData = null;
      categories.getCategory(categoryId)
      .then(function(response){
        vm.category = response.data;
        vm.rawData = response.data;
      }, function(error){
        vm.error = error.data;
      });
      
    };
    vm.getCategory(vm.categoryId);

    
  });

})());