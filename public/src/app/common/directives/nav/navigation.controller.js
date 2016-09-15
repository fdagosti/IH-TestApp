(function() {
    angular
    .module("InfiniteEPG")
    .controller("navigationCtrl", navigationCtrl);

    navigationCtrl.$inject = ["$scope", "$location", "authentication", "settings"];
    function navigationCtrl($scope, $location, authentication, settings){
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

        var _getSandboxes = function(){
            vm.currentSandbox = settings.getCurrentSandbox();
            settings.getSandboxes()
            .then(function(response){
                vm.sandboxes = response.data;
            }, function(error){
                console.log(error);
            })
        };

        vm.selectSandbox = function(sandbox){
            settings.setCurrentSandbox(sandbox);
            vm.currentSandbox = settings.getCurrentSandbox();
        };

        _getSandboxes();

        authentication.subscribe($scope, "nav", function somethingChanged() {
            _updateUser();
        });

        
    }
})();