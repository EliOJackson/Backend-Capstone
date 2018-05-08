"use strict";

angular
    .module("FantasyBB")
    .controller("HomeCtrl", function ($scope) {
        let currentUserId = null;

        // This listens for an event that is broadcast via $rootScope. Because $rootScope is the parent scope of $scope, anything on $rootScope is available on $scope ( remember, nested scopes acan look up to a higher scope for a value). When that event is emitted (which happens in the AuthFactory) this controller is sent the current user clientInformation. That allows us to attach the current user id to the object we send to the movie factory in addToWatchlist, below
        $scope.$on("handleBroadcast", function (event, user) {
            $scope.user= user;
            console.log("Current user6969", $scope.user.id);
            $scope.currentUser = user;
        });
        console.log("tucker!!!!", $scope.user);
        console.log("tucker!!!!", $scope.currentUserId);
        console.log("hello");
    });