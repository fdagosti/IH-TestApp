((function(){

angular.module('InfiniteEPG').controller('videoCtrl', function($scope, $routeParams, $timeout, hotkeys, video) {
   var vm = this;

    vm.currentVideoDetails = video.getCurrentVideoDetails();

    hotkeys.bindTo($scope)
    .add({
      combo: 'space',
      description: 'Toggle the banner visibility',
      callback: function() {vm.showUi?vm.showUi=false:vm.showTemporaryUI();}
    })

  vm.playLocator = function(locator, fakeSrc){
    vm.currentVideoDetails.playbackError = null;
    vm.currentVideoDetails = {};
    video.playLocator(locator, fakeSrc)
    .then(function(response){
      vm.currentVideoDetails = response;
    }, function(error){
      vm.currentVideoDetails.playbackError = error;
    })
    };

  vm.insertLinkIntoVideoTag = function(src){
    vm.playLocator(null, src);
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