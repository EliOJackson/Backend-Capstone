"use strict";
angular
.module("FantasyBB")
.controller("RankingsCtrl", function($scope, RankingFactory) {
    $scope.getUnownedPlayers = () => {
        // console.log("sup");
      RankingFactory.getUnownedPlayers().then(players => {
        // let newArray = [...new Set players.data.batters]
        console.log([...new Set(Object.values(players.data.batters))]);
      });
    };
  });
