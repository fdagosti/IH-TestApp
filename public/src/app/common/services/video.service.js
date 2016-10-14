(function(){

  angular
  .module('InfiniteEPG')
  .service('video', video);

  video.$inject = ["$q", "devices", "settings", "adsuite"];   
  function video($q,devices, settings, adsuite) {

  

var fakeVideo = null;
var currentVideoTagSrc = null;
var adSuiteDetails = null;
var playbackError = null;

var getCurrentVideoDetails = function(){
  return {
    fakeVideo: fakeVideo,
    currentSrc: currentVideoTagSrc,
    adSuiteDetails : adSuiteDetails,
    playbackError : playbackError
  };
}

var playLocator = function(locator, fakeSrc){
    return $q(function(resolve, reject){
      fakeVideo = fakeSrc || (settings.getDebugSettings().fakeVideo?settings.getRandomFakeVideo():null);
      if (fakeVideo){
        _insertLinkIntoVideoTag(fakeVideo, resolve, reject);
        return;        
      }

      devices.getPlaySession(locator)
        .then(function(response){
          var playSession = response.data;
          var videoToPlay = {"type":"application/x-mpegURL", "src":settings.getProxy()+playSession.links.playUrl.href};
          _insertLinkIntoVideoTag(videoToPlay, resolve, reject);        
        }, function(error){
            _stopVideo(error);
            reject(error);
        });
      
    });
  };

  var playVideoUrl = function(video){
    return playLocator(null, video);
    
  };

  var _insertLinkIntoVideoTag = function(src, resolve, reject){
    adSuiteDetails = null;
    if (!src){
      if (vm.videosrc.src.endsWith("m3u8")){
        src = {"type":"application/x-mpegURL", "src":vm.videosrc.src};
      }else{
        src = {"type":"video/mp4", "src":vm.videosrc.src};
      }
    }

    if (adsuite.isEnabled() && src.src.endsWith("m3u8")){
      adsuite.createAdSession(src.src)
      .then(function(response){
        adSuiteDetails = response.data;
        src.src = adSuiteDetails.links.play.href;
        _playVideo(src);
        resolve(getCurrentVideoDetails());
      }, function(error){
        _stopVideo(error);
        reject(error);
      });
    }else{
      _playVideo(src);
      resolve(getCurrentVideoDetails());
    }
  };

  var _stopVideo = function(error){
    playbackError = error;
    var player = videojs('video-background');
    player.src("");
    currentVideoTagSrc = null;
  };

  var _playVideo = function(videoSrc){
    playbackError = null;
    var player = videojs('video-background');
    currentVideoTagSrc = videoSrc;
    player.src(videoSrc);
    player.play();
  };

    
   return {
     getCurrentVideoDetails: getCurrentVideoDetails,
     playLocator: playLocator,
     playVideoUrl: playVideoUrl
   };
 }
})();