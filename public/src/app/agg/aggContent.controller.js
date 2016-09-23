((function(){

  angular.module('InfiniteEPG').controller('aggContentCtrl', function($window, $location, $scope, $routeParams, agg, settings) {
    var vm = this;

    vm.query = {
      
      limit: 10
    };

    vm.getContent = function(query){
      vm.content = null;
      vm.rawData = null;
      agg.getContent(query)
      .then(function(response){
        vm.count = response.data.count;
        vm.total = response.data.total;
        vm.content = response.data.content;
        vm.rawData = response.data;
      }, function(error){
        vm.error = error.data;
      });
      
    };
    vm.getContent(vm.query);

    settings.subscribe($scope, "content", function() {
      vm.getContent(vm.query);
    });

    vm.playVideo = function(content){
      $location.path("/video/"+content.id);
    };
    
  });

})());