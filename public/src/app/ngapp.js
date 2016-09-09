(function(){

    angular.module("InfiniteEPG", ["ngRoute"])
    .factory("mySocket", function(socketFactory){
        return socketFactory();
    });

    function config ($routeProvider, $locationProvider,$httpProvider) {
        $httpProvider.useLegacyPromiseExtensions(false);

        
        $routeProvider
            .when("/", {
                templateUrl: "src/app/landing/landing.template.html",
                 controller: "landingCtrl",
                 controllerAs: "vm"
            })
            .when("/channels", {
                templateUrl: "src/app/channels/channels.template.html",
                 controller: "channelsListCtrl",
                 controllerAs: "vm"
            })
            .when("/login", {
                templateUrl: "src/app/auth/login.template.html",
                 controller: "loginCtrl",
                 controllerAs: "vm"
            })
            .otherwise({redirectTo: "/"});

        $locationProvider.html5Mode(false);
    }

    angular
        .module("InfiniteEPG")
        .config(["$routeProvider", "$locationProvider","$httpProvider", config]);

})();