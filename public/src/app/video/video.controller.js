((function(){

angular.module('InfiniteEPG').controller('videoCtrl', function($scope, $routeParams, devices) {
   var vm = this;
    $scope.pageClass = 'video-page';

  vm.playLocator = function(locator){
    devices.getPlaySession(locator)
      .then(function(response){
        vm.playSession = response.data;
        var videoToPlay = {"type":"application/x-mpegURL", "src":vm.playSession.links.playUrl.href};
        vm.insertLinkIntoVideoTag(videoToPlay);        
      }, function(error){
        var errString = (error.status && error.statusText)?error.status+" "+error.statusText:error.toString;
        vm.error = "Could not retrieve playSession from IH server. Consider to log out and log in again. "+ errString;
        
      });
    };



  vm.insertLinkIntoVideoTag = function(src){
    if (!src){
      if (vm.videosrc.src.endsWith("m3u8")){
        src = {"type":"application/x-mpegURL", "src":vm.videosrc.src};
      }else{
        src = {"type":"video/mp4", "src":vm.videosrc.src};
      }
    }
    var player = videojs('contentViewer');
    player.src(src);
    player.play();
    vm.videosrc = src;

  };

  var locator = $routeParams.locator;
  if (locator){
    vm.playLocator(locator);
  } 
 
});

})());