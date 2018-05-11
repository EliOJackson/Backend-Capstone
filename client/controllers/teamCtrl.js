"use strict";

angular.module("FantasyBB").controller("TeamCtrl", function ($scope, PlayerFactory) {
        let currentUserId = null;

        $scope.$on("handleBroadcast", function (event, user) {
            $scope.user = user;
            console.log("Current 11111", $scope.user.username);
            $scope.currentUser = user;
        });

        $scope.console = () => {
            console.log("Emily is cool", $scope.players);
        }

        function load() {
            PlayerFactory.getPlayersSeason()
            .then(data => {
                console.log("mydata", data.data);
                $scope.batters = data.data.batters;
            })
        }
        load();
    });