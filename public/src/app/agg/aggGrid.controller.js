((function(){

  angular.module('InfiniteEPG').controller('aggGridCtrl', function($scope, $routeParams, agg, settings) {
    var vm = this;

    vm.query = {
      eventsLimit: 5,
      limit: 10
    };
    vm.grid = [];
    var currentOffset = 0;

    vm.getGrid = function(reset){
      if (reset){
        vm.grid = [];
        currentOffset = 0;
        vm.total = 0;
      }else {
        if (vm.grid.length >= vm.total){return;}
      }

      vm.rawData = null;
      vm.error = null;
      vm.busy = true;
      vm.query.offset = currentOffset;
      vm.query.limit = vm.total?Math.min(vm.query.limit, vm.total - currentOffset):vm.query.limit;
      agg.getGrid(vm.query)
      .then(function(response){
        var queryContent = response.data.channels;
        vm.count = response.data.count;
        vm.total = response.data.total;
        for (var i = 0; i < queryContent.length; i++) {
          vm.grid.push(queryContent[i]);
        }
        vm.rawData = response.data;
        currentOffset = vm.grid.length;
        vm.busy = false;
      }, function(error){
        vm.busy = false;
        vm.error = error.data;
      });
      
    };

     settings.subscribe($scope, "grid", function() {
      vm.getGrid(true);
    });
    
  });

})());