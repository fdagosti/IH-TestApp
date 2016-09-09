(function() {
    angular
    .module("InfiniteEPG")
    .service("authentication", authentication);

    authentication.$inject = ["$window", "$http"];
    function authentication($window, $http, $rootScope, $q) {
        var saveToken = function(token) {
            $window.localStorage["InfiniteEPG-token"] = JSON.stringify(token);;
        };

        var getToken = function() {
            var t = $window.localStorage["InfiniteEPG-token"];
            if (t){
                return JSON.parse(t).access_token;
            }
        };

        var login = function(credentials) {
            return $http.post("/api/login", credentials).then(function(response) {
                saveToken(response.data);
            });
        };

        var logout = function(){
            $window.localStorage.removeItem("InfiniteEPG-token");
            // notify();
        };

        var isLoggedIn = function() {
            
            var token = getToken();

            if (token) {
                var payload = JSON.parse($window.atob(token.split(".")[1]));

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        var currentUser = function() {
            if (isLoggedIn()) {
                var token = getToken();
                var payload = JSON.parse($window.atob(token.split(".")[1]));
                return {
                    _id: payload._id,
                    email: payload.email,
                    name: payload.name,
                    admin: payload.admin,
                    status: payload.status,
                };
            }
        };

        
        return {
            saveToken: saveToken,
            getToken: getToken,
            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn,
            currentUser: currentUser,
        };
    }
})();