(function() {
    angular
    .module("InfiniteEPG")
    .controller("navigationCtrl", navigationCtrl);

    navigationCtrl.$inject = ["$scope", "$location", "authentication", "settings", "suggest"];
    function navigationCtrl($scope, $location, authentication, settings, suggest){
        var vm = this;

        var _updateUser = function(){
            vm.isLoggedIn = authentication.isLoggedIn();
            vm.currentUser = authentication.currentUser();
        };

        _updateUser();


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
            console.log("getSuggestions ",keywords);
            return suggest.getSuggestions(keywords)
            .then(function(response){
            console.log("response from keywords", response.data);
            return response.data.suggestions;
      }, function(error){
        console.error("search did not work");
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
            settings.getSandboxes()
            .then(function(response){
                vm.sandboxes = response.data;
                vm.currentSandbox = settings.getCurrentSandbox();
            }, function(error){
                console.log(error);
            })
        };

        vm.selectSandbox = function(sandbox){
            settings.setCurrentSandbox(sandbox);
            vm.currentSandbox = settings.getCurrentSandbox();
        };

        _getSandboxes();

        authentication.subscribe($scope, "nav", function somethingChanged() {
            _updateUser();
        });

        
    }
})();