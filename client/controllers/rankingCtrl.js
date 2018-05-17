"use strict";
angular
.module("FantasyBB")
.controller("RankingsCtrl", function($scope, RankingFactory) {
    $scope.getUnownedPlayers = () => {
        // console.log("sup");
      RankingFactory.getUnownedPlayers().then(players => {
          $scope.batters = players.data.batters.sort(function(a, b){
              return a.ranking - b.ranking;
          });
          console.log(players.data.batters)
          $scope.pitchers = players.data.pitchers
      });
    };
  });
