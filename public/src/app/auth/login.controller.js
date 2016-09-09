(function() {
    angular
        .module("InfiniteEPG")
        .controller("loginCtrl", loginCtrl);

    loginCtrl.$inject = ["$location", "authentication"];
    function loginCtrl($location, authentication) {
        var vm = this;

        vm.pageHeader = {
            title: "Log in Into the Infinite Platform"
        };
        vm.credentials = {
            email: "",
            password: ""
        };

        vm.returnPage = $location.search().page || "/";

        vm.onSubmit = function() {
            vm.formError = "";
            if (!vm.credentials.client_id || !vm.credentials.client_secret) {
                vm.formError = "Tous les champs sont requis, veuillez réessayer";
                return false;
            } else {
                vm.doLogin(vm.credentials);
            }
        };

        vm.loginWithDefaultCredentials = function(){
            vm.doLogin({client_id:"auto",client_secret:"auto"});
        };

        vm.doLogin = function(credentials) {
            vm.formError = "";
            authentication
                .login(credentials)
                .then(function() {
                    $location.search("page", null);
                    $location.path(vm.returnPage);
                }, function(err) {
                    vm.formError = err.data;
                });
        };
    }
})();