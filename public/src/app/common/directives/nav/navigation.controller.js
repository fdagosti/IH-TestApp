(function() {
    angular
    .module("InfiniteEPG")
    .controller("navigationCtrl", navigationCtrl);

    navigationCtrl.$inject = ["$scope", "$location", "authentication"];
    function navigationCtrl($scope, $location, authentication){
        var vm = this;

        var _updateUser = function(){
            vm.isLoggedIn = authentication.isLoggedIn();
            vm.currentUser = authentication.currentUser();
        };

        _updateUser();

        vm.currentPath = function() {
            return $location.path();
        };

        vm.logout = function() {
            authentication.logout();
            $location.path("/");
        };

        authentication.subscribe($scope, "nav", function somethingChanged() {
            _updateUser();
        });

        
    }
})();