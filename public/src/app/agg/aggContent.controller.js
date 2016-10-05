((function(){

  angular.module('InfiniteEPG').controller('aggContentCtrl', function($window, $location, $scope, $routeParams, agg, settings, pins) {
    var vm = this;

    var catId = $location.search().categoryId;
    if (catId && catId.endsWith('{')){
      // this is to correct a bug the server seems to send about category links
      catId = catId.substring(0, catId.length - 1);
    }

    var assetName = $location.search().name;
    var currentOffset = 0;

    if (assetName){
      vm.query = {
        q: assetName,
      };
    }else {
      vm.query = {
        limit: 10,
        offset: currentOffset,
        categoryId: catId
      };
      
    }

    vm.content = [];

    vm.getContent = function(){
      console.log("GET Content ",vm.query);
      vm.rawData = null;
      vm.error = null;
      vm.busy = true;
      vm.query.offset = currentOffset;
      agg.getContent(vm.query)
      .then(function(response){
        var queryContent = response.data.content;
        vm.count = response.data.count;
        vm.total = response.data.total;
        for (var i = 0; i < queryContent.length; i++) {
          vm.content.push(queryContent[i]);
        }
        
        vm.rawData = response.data;
        currentOffset = vm.content.length;
        vm.busy = false;
      }, function(error){
        vm.busy = false;
        vm.error = error.data;
      });
      
    };
    // vm.getContent();

    settings.subscribe($scope, "content", function() {
      vm.content = [];
      vm.getContent();
    });

    vm.playVideo = function(content){
      $location.path("/video/"+content.id);
      
    };
    
  });

})());