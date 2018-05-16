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

        $scope.season = () => {
            $scope.loading = true;
            PlayerFactory.getPlayersSeason().then(data => {
              console.log("mydata", data.data);
              $scope.batters = data.data.batters;
              $scope.pitchers = data.data.pitchers;
              $scope.loading = false;
            });
        }
        $scope.today = () => {
            $scope.loading = true;            
            PlayerFactory.getPlayersToday().then(data => {
              console.log("mydata", data.data);
              $scope.batters = data.data.batters;
              $scope.pitchers = data.data.pitchers;
              $scope.loading = false;              
            });
        }

        $scope.reverse = () => {
            PlayerFactory.getPlayersSeason().then(data => {
                let chups = data.data.pitchers;
                chups.forEach(pitcher => {
                    let fullName = pitcher.name;
                    let splitName = fullName.split(" ");
                    let spliceName = splitName[0].slice(0, 2);
                    let lastName = splitName[1].slice(0, 5);
                    let lastNameFirstLetter = splitName[1].slice(0,1).toLowerCase();
                    let concatName = (lastName + spliceName).toLowerCase();
                    let url = `www.baseball-reference.com/players/${lastNameFirstLetter}/${concatName}01.shtml`
                    console.log(url);
                })
            })
        }
        // function load() {
        //     PlayerFactory.getPlayersSeason()
        //     .then(data => {
        //         console.log("mydata", data.data);
        //         $scope.batters = data.data.batters;
        //     })
        // }
        // load();
    });