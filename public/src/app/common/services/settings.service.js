(function(){

  angular
  .module('InfiniteEPG')
  .service('settings', settings);

  settings.$inject = ["$window", "$http", "$rootScope", "authentication"];   
  function settings ($window, $http, $rootScope, authentication) {

    var _defaultSandboxes = [
      {name: "Production", url: "https://apx.cisco.com/spvss/infinitehome/infinitetoolkit/v_sandbox_2/"},
      {name: "IBC", url: "https://apx.cisco.com/spvss/infinitehome/infinitetoolkit/v2_ibc_2016/"},
      {name: "Ctap 1.3", url: "http://ih-cis-vip.spvsstmedmz.cisco.com/ctap/r1.3.0/", proxy: true, headers: {'x-cisco-vcs-identity': '{"upId":"itk_0","hhId":"itk","devId":"63F2000C1AF85197", "deviceFeatures": ["COMPANION","ABR","ANDROID","WIFI-CHIP","PHONE","VG-DRM"],"cmdcDeviceType":"ANDROID","sessionId":"b705d50d-82f0-4ad5-afc7-a61b1bf29aeb","tenant":"k","region":"100","cmdcRegion":"16384~16639"}'}}
    ];

    var _saveDebugSettings = function() {
            $window.localStorage["InfiniteEPG-debug-settings-v2"] = JSON.stringify(_debugSettings);
    };

    var getSandboxes = function(){
      return _defaultSandboxes;
      
    };

    var _defaultDebugSettings = {
      proxy: "https://cisco-itk-proxy.herokuapp.com/",
      fakeVideo: true,
      fakeVideosList: [
        {"type":"application/x-mpegURL", "src":"http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8"},
        {"type":"application/x-mpegURL", "src":"http://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8"},
        {"type":"application/x-mpegURL", "src":"http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8"},
        {"type":"application/x-mpegURL", "src":"http://content.jwplatform.com/manifests/vM7nH0Kl.m3u8"},
      ]
    };

    var copyDefaults = function(){
      return {
        proxy : _defaultDebugSettings.proxy,
        fakeVideo: _defaultDebugSettings.fakeVideo,
        fakeVideosList:_defaultDebugSettings.fakeVideosList,
      };
    };

    // var _currentSandbox;
    var _debugSettings =copyDefaults();

   var getCurrentSandbox = function(){

      var t = $window.localStorage["InfiniteEPG-debug-settings-v2"];
      if (t){
          _debugSettings = JSON.parse(t);
          return _debugSettings.currentSandbox;
      }
   };

   var resetDebugSettings = function(){
    $window.localStorage.removeItem("InfiniteEPG-debug-settings-v2");
    _debugSettings = copyDefaults();
    setCurrentSandbox(getSandboxes()[0]);
   };

   var getSandboxHeaders = function(){
      var sandbox = getCurrentSandbox();
      if (sandbox.headers){
        return sandbox.headers;
      }else{
        return {
          Authorization: "Bearer "+authentication.getAccessToken()
        };
      }
   };

   var getProxy = function(){
    return _debugSettings.proxy;
   };

   var setCurrentSandbox = function(sandbox){
    if (sandbox.proxy){
      sandbox = {
        name: sandbox.name,
        url: getProxy()+sandbox.url,
        proxy: sandbox.proxy,
        headers: sandbox.headers
      };
    }
    _debugSettings.currentSandbox = sandbox;
    _saveDebugSettings();
    notify();
   };

   var setDebugSettings = function(debugSettings){
    _debugSettings = debugSettings;
    _saveDebugSettings();
   };


   var getDebugSettings = function(settings){
      _debugSettings.sandboxes = getSandboxes();
      return _debugSettings;
   };

    var notify = function(){
        $rootScope.$emit('settings-service-event');
    };

    var cbs = [], ids = [];
    var cbf = function(){
        cbs.forEach(function(cb){
            cb();
        });
    };

    var getUserSettings = function(){
      return $http.get(getCurrentSandbox().url + "userProfiles/me/settings",  {
        headers: getSandboxHeaders(),
        
        });
    };

    if(!getCurrentSandbox()){
      setCurrentSandbox(getSandboxes()[0]);
    }

   return {
     subscribe: function(scope, id, callback) {
                if (ids.indexOf(id) >= 0){
                    cbs[ids.indexOf(id)] = callback;
                    return;
                } else {
                    ids.push(id);
                    cbs.push(callback);    
                }
                var handler = $rootScope.$on('settings-service-event', cbf);
                scope.$on('$destroy', handler);
            },
     getSandboxes : getSandboxes,
     getCurrentSandbox : getCurrentSandbox,
     setCurrentSandbox : setCurrentSandbox,
     getSandboxHeaders : getSandboxHeaders,
     getProxy : getProxy,
     getUserSettings : getUserSettings,
     getDebugSettings: getDebugSettings,
     resetDebugSettings: resetDebugSettings,
     setDebugSettings: setDebugSettings,
     getRandomFakeVideo : function(){
      var idx = Math.floor(Math.random()*(_debugSettings.fakeVideosList.length));
        return _debugSettings.fakeVideosList[idx];
      }
   };
 }
})();