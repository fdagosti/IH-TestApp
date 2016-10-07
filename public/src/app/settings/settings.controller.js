(function() {
    angular
        .module("InfiniteEPG")
        .controller("settingsCtrl", settingsCtrl);

    settingsCtrl.$inject = ["$scope","$location", "authentication", "settings"];
    function settingsCtrl($scope, $location, authentication, settings) {
        var vm = this;

        vm.pageHeader = {
            title: "Infinite Settings"
        };
        
        vm.getUserSettings = function(){
            vm.userError = null;
            vm.settings = null;
            settings.getUserSettings()
            .then(function(response){
                vm.settings = response.data;

            }, function(error){
               vm.userError = error.data; 
            });
        };

        vm.getDebugSettings = function(){
            vm.debugSettings = settings.getDebugSettings();
            
        }
        vm.getDebugSettings();

        vm.setCurrentSandbox = function(idx){
            settings.setCurrentSandbox(vm.debugSettings.sandboxes[idx]);
        }

        vm.saveSettings = function(){
            settings.setDebugSettings(vm.debugSettings);
        };

        vm.getUserSettings();
        vm.currentSandbox = settings.getCurrentSandbox().name;
        settings.subscribe($scope, "settings", function somethingChanged() {
            vm.getUserSettings();
            vm.currentSandbox = settings.getCurrentSandbox().name;
        });

    }
})();