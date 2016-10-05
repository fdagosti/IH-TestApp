((function(){

  angular.module('InfiniteEPG').controller('channelsListCtrl', function($scope, channels, settings) {
    var vm = this;

    vm.query = {};
    vm.channels = [];
    var currentOffset = 0;

    vm.listChannels = function(){
      if (vm.channels.length >= vm.total){return;}
      vm.rawData = null;
      vm.error = null;
      vm.busy = true;
      vm.query.offset = currentOffset;
      vm.query.limit = vm.total?Math.min(20, vm.total - currentOffset):20;
      channels.listChannels(vm.query)
      .then(function(response){
        var queryContent = response.data.channels;
        vm.count = response.data.count;
        vm.total = response.data.total;
        for (var i = 0; i < queryContent.length; i++) {
          vm.channels.push(queryContent[i]);
        }
        vm.rawData = response.data;
        currentOffset = vm.channels.length;
        vm.busy = false;
      }, function(error){
        vm.busy = false;
        vm.error = error.data;
      });
      
    };
    // vm.listChannels();

    settings.subscribe($scope, "channels", function() {
      vm.listChannels(vm.query);
    });
    
  });

})());