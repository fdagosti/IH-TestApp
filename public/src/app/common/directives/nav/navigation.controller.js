(function() {
    angular
    .module("InfiniteEPG")
    .controller("navigationCtrl", navigationCtrl);

    navigationCtrl.$inject = ["$scope", "$location", "authentication", "settings", "suggest", "pins", "hotkeys"];
    function navigationCtrl($scope, $location, authentication, settings, suggest, pins, hotkeys){
        var vm = this;

        var _updateUser = function(){
            vm.isLoggedIn = authentication.isLoggedIn();
            vm.currentUser = authentication.currentUser();
        };

        _updateUser();

        hotkeys.add({
            combo: 'esc',
            description: 'Back to Full Screen Video',
            callback: function() {
              $location.path("/video");
            }
          });

        var s = 1000;
        var m = 60*s;
        var h = 60*m;
        var d = 24*h;
        var w = 7*d;
        _getDurationString = function(duration){
            var week = Math.floor(duration / w);
            duration = duration % w;
            var day = Math.floor(duration / d);
            duration = duration % d;
            var hours = Math.floor(duration / h);
            duration = duration % h;
            var mins = Math.floor(duration / m);
            duration = duration % m;
            var secs = Math.floor(duration / s);
            duration = duration % s;

            if (week !== 0){
              return week + (week === 1?" week":" weeks");
            } else if (day !== 0){
              return day + " days";
            } else if (hours !== 0){
              return hours+" hours";
            } else if (mins !== 0){
              return mins+" minutes";
            }
            return secs+" secondes";
        };

        vm.getSuggestions = function(keywords){
            return suggest.getSuggestions(keywords)
            .then(function(response){
            return response.data.suggestions;
      }, function(error){
        console.error("search did not work");
      });
        };

        vm.showPin = function(){
            vm.pinChecked = false;
            pins.getModalPin().result
            .then(function(pinOk) {
                vm.pinChecked = pinOk;
            });
        };

        vm.goToSearchTerm = function(item, model, label, event){
            $location.search("name", item.name);
            $location.path("/content/");
        };

        vm.getTokenLeftTime = function(){
            vm.token = authentication.getToken();
            if (!vm.token){return;}
            var timeLeft = vm.token.exp*1000 - Date.now();
            return _getDurationString(timeLeft);
        };

        vm.currentPath = function() {
            return $location.path();
        };

        vm.logout = function() {
            authentication.logout();
            $location.path("/");
        };

        var _getSandboxes = function(){
            vm.sandboxes = settings.getSandboxes();
            vm.currentSandbox = settings.getCurrentSandbox();
        };

        vm.selectSandbox = function(sandbox){
            settings.setCurrentSandbox(sandbox);
            vm.currentSandbox = settings.getCurrentSandbox();
        };

        _getSandboxes();

        settings.subscribe($scope, "nav", function somethingChanged() {
            vm.currentSandbox = settings.getCurrentSandbox();
        });

        authentication.subscribe($scope, "nav", function somethingChanged() {
            _updateUser();
        });

        
    }
})();