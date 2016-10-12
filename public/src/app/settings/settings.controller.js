(function() {
    angular
        .module("InfiniteEPG")
        .controller("settingsCtrl", settingsCtrl);

    settingsCtrl.$inject = ["$scope","$location", "authentication", "settings", "adsuite"];
    function settingsCtrl($scope, $location, authentication, settings, adsuite) {
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

        vm.getAdSuiteSettings = function(){
            vm.adsuiteSettings = adsuite.getSettings();
        };
        vm.enableAdSuite = function(){
            adsuite.enable(vm.adsuiteSettings.enabled);
        };
        vm.getAdSuiteStatus = function(){
            adsuite.getStatus()
            .then(function(response){
                vm.adSuiteStatusOk = response.data;
                vm.adSuiteStatusError = null;
            }, function(error){
                vm.adSuiteStatusOk = null;
                vm.adSuiteStatusError = "Service Not OK";
            }); 
        };
        vm.getAdSuiteSettings();
        vm.getAdSuiteStatus();
        vm.setAdSuiteCurrentUser = function(){
            adsuite.setCurrentUser(vm.adsuiteSettings.currentUser);
        };

        vm.getDebugSettings = function(){
            vm.debugSettings = settings.getDebugSettings();
            
        };
        vm.getDebugSettings();

        vm.setCurrentSandbox = function(idx){
            settings.setCurrentSandbox(vm.debugSettings.sandboxes[idx]);
        };

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