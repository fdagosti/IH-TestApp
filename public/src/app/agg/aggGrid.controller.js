((function(){

  angular.module('InfiniteEPG').controller('aggGridCtrl', function($scope, $routeParams, agg, settings) {
    var vm = this;

    vm.query = {
      eventsLimit: 5,
      limit: 10
    };

    vm.getGrid = function(query){
      vm.grid = null;
      vm.rawData = null;
      vm.error = null;
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
    vm.getGrid(vm.query);

     settings.subscribe($scope, "grid", function() {
      vm.getGrid(vm.query);
    });
    
  });

})());