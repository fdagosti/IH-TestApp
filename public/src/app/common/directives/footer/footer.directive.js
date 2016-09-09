(function(){
    angular
        .module("InfiniteEPG")
        .directive("appfooter", footerGeneric);

    function footerGeneric(){
        return {
            restrict: "EA",
            templateUrl: "src/app/common/directives/footer/footer.template.html"
        };
    }
})();