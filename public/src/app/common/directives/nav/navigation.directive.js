(function () {

  angular
    .module('InfiniteEPG')
    .directive('navigation', navigation);

  function navigation () {
    return {
      restrict: 'EA',
      templateUrl: 'src/app/common/directives/nav/navigation.template.html',
      controller: "navigationCtrl as navvm"
    };
  }

})();