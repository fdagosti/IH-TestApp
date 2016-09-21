((function(){

  angular.module('InfiniteEPG').controller('aggContentCtrl', function($window, $sce, $scope, $routeParams, agg, settings, devices) {
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

    vm.getPlaySession = function(content){
      devices.getPlaySession(content.id)
      .then(function(response){
        // console.log("Playsession answered");
        // console.log(response.data);
        var t = $sce.trustAsResourceUrl(response.data.links.playUrl.href);
        // console.log(t);
        response.data.links.playUrl.secureHref = t;
        content.playSession = response.data;

        // var flashvars = {
        //     src: response.data.links.playUrl.href,
        //     plugin_hls:"/player/HLSTestPlayer.swf"
        // };
        // var params = {
        //     allowFullScreen: true
        //     , allowScriptAccess: "always"
        //     , bgcolor: "#000000"
        // };
        // var attrs = {
        //     name: "player0"
        // };

        // console.log(flashvars);

        // $window.swfobject.embedSWF("player/GrindPlayer.swf", "player0", "854", "480", "10.2", null, flashvars, params, attrs);

      }, function(error){
        vm.error = error.data;
      })
    };
    
  });

})());