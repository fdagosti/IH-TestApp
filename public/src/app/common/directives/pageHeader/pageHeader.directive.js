(function(){

    angular
        .module("InfiniteEPG")
        .directive("pageHeader", pageHeader);

    function pageHeader() {
        return {
            restrict : "EA",
            scope: {
                content: "=content"
            },
            templateUrl: "src/app/common/directives/pageHeader/pageHeader.template.html"
        };
    }
})();