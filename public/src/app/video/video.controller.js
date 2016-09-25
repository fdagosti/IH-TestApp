((function(){

angular.module('InfiniteEPG').controller('videoCtrl', function($scope, $sce, $routeParams, devices) {
   var vm = this;
    $scope.pageClass = 'video-page';
    vm.video = document.getElementById("contentViewer");
    var canPlayHLS = vm.video.canPlayType("application/vnd.apple.mpegURL");

    vm.handleError = function(){
      vm.playbackError = "Video Tag Error Code "+vm.video.error.code;
      
    };  

  vm.playLocator = function(locator){
    devices.getPlaySession(locator)
      .then(function(response){
        vm.playSession = response.data;
        vm.insertLinkIntoVideoTag(vm.playSession.links.playUrl.href);        
      }, function(error){
        vm.error = "Could not retrieve playSession from IH server. Consider to log out and log in again. "+ error.toString();
      });
    };



  vm.insertLinkIntoVideoTag = function(src){
    if (!src){src = vm.videosrc;}
    if (src.endsWith("m3u8") && !canPlayHLS){
      vm.hlsError = src;
    }else{
      vm.hlsError = "";
    }
    var t = $sce.trustAsResourceUrl(src);
    delete vm.playbackError;
    vm.videoToPlay = t;
    vm.videosrc = t;
  };

  var locator = $routeParams.locator;
  if (locator){
    vm.playLocator(locator);
  } 
 
});

})());