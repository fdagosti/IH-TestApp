((function(){

angular.module('InfiniteEPG').controller('landingCtrl', function($scope, channels, authentication) {
   var vm = this;
  
  vm.login = function(){
    authentication.login({client_id:"toto", client_secret:"titi"});
  }
 
});

})());