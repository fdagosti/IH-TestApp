((function(){

  angular.module('InfiniteEPG').controller('channelsListCtrl', function($scope, channels, settings) {
    var vm = this;

    vm.query = {};

    vm.listChannels = function(query){
      vm.channels = null;
      vm.rawData = null;
      vm.error = null;
      channels.listChannels(query)
      .then(function(response){
        vm.count = response.data.count;
        vm.total = response.data.total;
        vm.channels = response.data.channels;
        vm.rawData = response.data;
      }, function(error){
        vm.error = error.data;
      });
      
    };
    vm.listChannels(null);

    settings.subscribe($scope, "channels", function() {
      vm.listChannels(vm.query);
    });
    
  });

})());