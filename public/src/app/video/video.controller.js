((function(){

angular.module('InfiniteEPG').controller('videoCtrl', function($scope, $sce, $routeParams, devices) {
   var vm = this;
    $scope.pageClass = 'video-page';


  vm.playLocator = function(locator){
    devices.getPlaySession(locator)
      .then(function(response){
        vm.playSession = response.data;
        vm.insertLinkIntoVideoTag(vm.playSession.links.playUrl.href);        
      }, function(error){
        vm.error = error.data;
      });
    };

  vm.insertLinkIntoVideoTag = function(src){
    if (!src){src = vm.videosrc;}
    var t = $sce.trustAsResourceUrl(src);
    vm.videoToPlay = t;
  };

  var locator = $routeParams.locator;
  console.log("locator to play "+locator);
  if (locator){
    vm.playLocator(locator);
  } 
 
});

})());