((function(){

  angular.module('InfiniteEPG').controller('aggContentCtrl', function($window, $location, $scope, $routeParams, agg, settings, pins) {
    var vm = this;

    var catId = $location.search().categoryId;
    if (catId && catId.endsWith('{')){
      // this is to correct a bug the server seems to send about category links
      catId = catId.substring(0, catId.length - 1);
    }

    var assetName = $location.search().name;

    if (assetName){
      vm.query = {
        q: assetName,
      };
    }else {
      vm.query = {
        limit: 10,
        categoryId: catId
      };
      
    }


    vm.getContent = function(query){
      vm.content = null;
      vm.rawData = null;
      vm.error = null;
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