(function(){

    angular.module("InfiniteEPG", ["ngRoute", "ngAnimate", "ui.bootstrap", "infinite-scroll", "angularSpinner"])
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
            .when("/categories", {
                templateUrl: "src/app/categories/categories.template.html",
                 controller: "categoriesListCtrl",
                 controllerAs: "vm"
            })
            .when("/categories/:categoryId", {
                templateUrl: "src/app/categories/category.template.html",
                 controller: "categoryCtrl",
                 controllerAs: "vm"
            })
            .when("/agg/grid", {
                templateUrl: "src/app/agg/aggGrid.template.html",
                 controller: "aggGridCtrl",
                 controllerAs: "vm"
            })
            .when("/agg/content", {
                templateUrl: "src/app/agg/aggContent.template.html",
                 controller: "aggContentCtrl",
                 controllerAs: "vm"
            })
            .when("/content", {
                templateUrl: "src/app/agg/aggContent.template.html",
                 controller: "aggContentCtrl",
                 controllerAs: "vm"
            })
            .when("/login", {
                templateUrl: "src/app/auth/login.template.html",
                 controller: "loginCtrl",
                 controllerAs: "vm"
            })
            .when("/settings", {
                templateUrl: "src/app/settings/settings.template.html",
                 controller: "settingsCtrl",
                 controllerAs: "vm"
            })
            .when("/video/:locator", {
                templateUrl: "src/app/video/video.template.html",
                 controller: "videoCtrl",
                 controllerAs: "vm"
            })
            .otherwise({redirectTo: "/"});

        $locationProvider.html5Mode(false);
    }

    angular
        .module("InfiniteEPG")
        .config(["$routeProvider", "$locationProvider","$httpProvider", config]);

})();