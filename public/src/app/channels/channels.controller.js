((function(){

  angular.module('InfiniteEPG').controller('channelsListCtrl', function($scope, channels) {
    var vm = this;

    
    vm.listChannels = function(){
      channels.listChannels()
      .then(function(response){
        vm.channels = response.data.channels;
        vm.rawData = response.data;
        
      }, function(error){
        vm.error = error.data;
      });
      
    };

    vm.listChannels();

    
  });

})());