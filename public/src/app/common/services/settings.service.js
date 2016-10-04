(function(){

  angular
  .module('InfiniteEPG')
  .service('settings', settings);

  settings.$inject = ["$window", "$http", "$rootScope", "authentication"];   
  function settings ($window, $http, $rootScope, authentication) {

    var _saveSettings = function() {
            $window.localStorage["InfiniteEPG-settings"] = JSON.stringify(_currentSandbox);
        };

    var getSandboxes = function(){
      return $http.get("/api/sandboxes").then(function(response){
        if (!getCurrentSandbox()){
          setCurrentSandbox(response.data[0]);
        }
         return response;
      });
    };

    var _currentSandbox;

   var getCurrentSandbox = function(){
      var t = $window.localStorage["InfiniteEPG-settings"];
      if (t){
          return JSON.parse(t);
      }
   };

   var getSandboxURL = function(){

   };

   var getSandboxHeaders = function(){
      var sandbox = getCurrentSandbox();
      if (sandbox.headers){
        return sandbox.headers;
      }else{
        return {
          Authorization: "Bearer "+authentication.getAccessToken()
        }
      }
   };

   var getProxy = function(){
    return "https://cisco-itk-proxy.herokuapp.com/";
   }

   var setCurrentSandbox = function(sandbox){
    if (sandbox.proxy){sandbox.url = getProxy()+sandbox.url}
    _currentSandbox = sandbox;
    _saveSettings();
    notify();
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
   };
 }
})();