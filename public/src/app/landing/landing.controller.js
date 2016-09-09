((function(){

angular.module('InfiniteEPG').controller('landingCtrl', function($scope, $location, channels, authentication) {
   var vm = this;
  
  vm.isLoggedIn = authentication.isLoggedIn();

    authentication.subscribe($scope, "landing", function() {
      vm.isLoggedIn = authentication.isLoggedIn();
    });

vm.returnPage = $location.search().page || "/";

  vm.login = function(){
    authentication.login();
  }
 
});

})());