((function(){

  angular.module('InfiniteEPG').controller('channelsListCtrl', function($scope, channels) {
    var vm = this;

    vm.query = {};

    vm.listChannels = function(query){
      vm.channels = null;
      vm.rawData = null;
      channels.listChannels(query)
      .then(function(response){
        vm.channels = response.data.channels;
        vm.rawData = response.data;
      }, function(error){
        vm.error = error.data;
      });
      
    };
    vm.listChannels(null);

    
  });

})());