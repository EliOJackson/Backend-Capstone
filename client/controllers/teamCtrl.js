"use strict";

angular
    .module("FantasyBB")
    .controller("TeamCtrl", function ($scope) {
        let currentUserId = null;

        // This listens for an event that is broadcast via $rootScope. Because $rootScope is the parent scope of $scope, anything on $rootScope is available on $scope ( remember, nested scopes acan look up to a higher scope for a value). When that event is emitted (which happens in the AuthFactory) this controller is sent the current user clientInformation. That allows us to attach the current user id to the object we send to the movie factory in addToWatchlist, below
        $scope.$on("handleBroadcast", function (event, user) {
            $scope.user = user;
            console.log("Current 11111", $scope.user.username);
            $scope.currentUser = user;
        });

        $scope.console = () => {
            console.log("Emily is cool", $scope.user);
        }
    });