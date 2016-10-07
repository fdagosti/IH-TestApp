((function(){

angular.module('InfiniteEPG').controller('videoCtrl', function($scope, $routeParams, $timeout, devices, settings) {
   var vm = this;
    vm.fakeVideo = settings.getDebugSettings().fakeVideo;

  vm.playLocator = function(locator){
    devices.getPlaySession(locator)
      .then(function(response){
        vm.playSession = response.data;
        var videoToPlay = {"type":"application/x-mpegURL", "src":settings.getProxy()+vm.playSession.links.playUrl.href};
        if (vm.fakeVideo){
          videoToPlay.src = "https://s3-eu-west-1.amazonaws.com/infinite-epg/lasvegas-vod/lasvegas.m3u8";
        }
        vm.insertLinkIntoVideoTag(videoToPlay);        
      }, function(error){
        if (!vm.fakeVideo){
          var errString = (error.status && error.statusText)?error.status+" "+error.statusText:error.toString;
          vm.error = "Could not retrieve playSession from IH server. Consider to log out and log in again. "+ errString;
        }else{
          var videoToPlay = {"type":"application/x-mpegURL", "src":"https://s3-eu-west-1.amazonaws.com/infinite-epg/lasvegas-vod/lasvegas.m3u8"};
          vm.insertLinkIntoVideoTag(videoToPlay);        
        }
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
    var player = videojs('video-background');
    player.src(src);
    player.play();
    vm.videosrc = src;

  };

  var locator = $routeParams.locator;
  if (locator){
    vm.playLocator(locator);
  } 

  var timer;
  vm.showTemporaryUI = function(){
    vm.showUi = true;
    $timeout.cancel(timer);
    timer = $timeout(function(){
      vm.showUi = false;
      timer = null;
    },5000);
  };
 
  vm.showTemporaryUI();
});

})());