(function() {
    angular
        .module("InfiniteEPG")
        .controller("pinCtrl", pinCtrl);

    pinCtrl.$inject = ["$location", "pins", "$uibModalInstance"];
    function pinCtrl($location, pins, $uibModalInstance) {
        var vm = this;

        pinStatus = function(){
            pins.getStatus()
            .then(function(response){
                vm.pinStatus = response.data;
            }, function(error){
                vm.error = error.data.displayMessage;
            });
        };

        pinStatus();

        vm.checkPin = function(pin){
            pins.checkPin(pin)
            .then(function(response){
                $uibModalInstance.close(true);    
            }, function(error){
                vm.error = error.data.displayMessage;
                pinStatus();
            });
        };

        vm.cancel = function(){
            $uibModalInstance.close();
        };
    }
})();