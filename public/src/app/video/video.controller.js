((function(){

angular.module('InfiniteEPG').controller('videoCtrl', function($scope, $routeParams, $timeout, devices, settings, hotkeys) {
   var vm = this;
    vm.fakeVideo = settings.getDebugSettings().fakeVideo?settings.getRandomFakeVideo():null;

    // retrieving the currently playing content from the video tag itself
    vm.videosrc = {src: videojs('video-background').src()};

    hotkeys.bindTo($scope)
    .add({
      combo: 'space',
      description: 'Toggle the banner visibility',
      callback: function() {vm.showUi?vm.showUi=false:vm.showTemporaryUI();}
    })

  vm.playLocator = function(locator){
    devices.getPlaySession(locator)
      .then(function(response){
        vm.playSession = response.data;
        var videoToPlay = {"type":"application/x-mpegURL", "src":settings.getProxy()+vm.playSession.links.playUrl.href};
        if (vm.fakeVideo){
          videoToPlay = vm.fakeVideo;
        }
        vm.insertLinkIntoVideoTag(videoToPlay);        
      }, function(error){
        if (!vm.fakeVideo){
          var errString = (error.status && error.statusText)?error.status+" "+error.statusText:error.toString;
          vm.error = "Could not retrieve playSession from IH server. Consider to log out and log in again. "+ errString;
        }else{
          vm.insertLinkIntoVideoTag(vm.fakeVideo);        
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