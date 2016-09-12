((function(){

  angular.module('InfiniteEPG').controller('aggGridCtrl', function($scope, $routeParams, agg) {
    var vm = this;

    vm.query = {};

    vm.getGrid = function(query){
      vm.grid = null;
      vm.rawData = null;
      agg.getGrid(query)
      .then(function(response){
        vm.count = response.data.count;
        vm.total = response.data.total;
        vm.grid = response.data.channels;
        vm.rawData = response.data;
      }, function(error){
        vm.error = error.data;
      });
      
    };
    vm.getGrid(null);

    
  });

})());