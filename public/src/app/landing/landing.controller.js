((function(){

angular.module('InfiniteEPG').controller('landingCtrl', function($scope, $location, channels, authentication, pins) {
   var vm = this;
  
  vm.isLoggedIn = authentication.isLoggedIn();

    authentication.subscribe($scope, "landing", function() {
      vm.isLoggedIn = authentication.isLoggedIn();
    });

vm.returnPage = $location.search().page || "/";

  vm.login = function(){
    authentication.login();
  };

  vm.showPin = function(){
            vm.pinChecked = false;
            pins.getModalPin().result
            .then(function(pinOk) {
                vm.pinChecked = pinOk;
            });
        };
 
});

})());