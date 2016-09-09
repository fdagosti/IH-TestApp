(function() {
    angular
    .module("InfiniteEPG")
    .service("authentication", authentication);

    authentication.$inject = ["$window", "$http", "$rootScope"];
    function authentication($window, $http, $rootScope, $q) {
        var saveToken = function(token) {
            token.exp = Date.now()/1000 + token.expires_in;
            $window.localStorage["InfiniteEPG-token"] = JSON.stringify(token);
        };

        var getToken = function() {
            var t = $window.localStorage["InfiniteEPG-token"];
            if (t){
                return JSON.parse(t);
            }
        };

        var getAccessToken = function(){
            return getToken().access_token;
        }

        var login = function(credentials) {
            return $http.post("/api/login", credentials).then(function(response) {
                saveToken(response.data);
                notify();
            });
        };

        var logout = function(){
            $window.localStorage.removeItem("InfiniteEPG-token");
            notify();
        };

        var isLoggedIn = function() {
            
            var token = getToken();
            if (token) {
                return token.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        var currentUser = function() {
            if (isLoggedIn()) {
                var token = getToken();
                return {
                    client_id: token.client_id,
                };
            }
        };

        var notify = function(){
            $rootScope.$emit('auth-service-event');
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
                var handler = $rootScope.$on('auth-service-event', cbf);
                scope.$on('$destroy', handler);
            },
            notify: notify,
            saveToken: saveToken,
            getToken: getToken,
            getAccessToken: getAccessToken,
            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn,
            currentUser: currentUser,
        };
    }
})();