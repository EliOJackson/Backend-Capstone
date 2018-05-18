"use strict";
angular
  .module("FantasyBB")
  .controller("RankingsCtrl", function($scope, RankingFactory, PlayerFactory) {
    $scope.getUnownedPlayers = () => {
      // console.log("sup");
      RankingFactory.getUnownedPlayers().then(players => {
        $scope.batters = players.data.batters.sort(function(a, b) {
          return a.ranking - b.ranking;
        });
        console.log(players.data.batters);
        $scope.pitchers = players.data.pitchers;
      });
    };
    const onLoad = () => {
      $scope.loading = true;
      RankingFactory.getOwnedPlayers().then(ownedPlayers => {
        $scope.batters = addUrl(ownedPlayers.data.batters);
        $scope.pitchers = addUrl(ownedPlayers.data.pitchers);
        RankingFactory.getUnownedPlayers().then(unownedPlayers => {
          let sortedUnownedBatters = unownedPlayers.data.batters.sort(function(
            a,
            b
          ) {
            return a.ranking - b.ranking;
          });
          let sortedUnownedPitchers = unownedPlayers.data.pitchers.sort(function(
            a,
            b
          ) {
            return a.ranking - b.ranking;
          });
          $scope.unownedBatters = addUrl(sortedUnownedBatters);
          $scope.unownedPitchers = addUrl(sortedUnownedPitchers);
          console.log($scope.unownedBatters, $scope.unownedPitchers, $scope.batters, $scope.pitchers)
          $scope.loading = false;
        });
      });
    };
    let addUrl = players => {
      let playerArray = [];
      players.forEach(player => {
        let fullName = player.name;
        let splitName = fullName.split(" ");
        let spliceName = splitName[0].slice(0, 2);
        let lastName = splitName[1].slice(0, 5);
        let lastNameFirstLetter = splitName[1].slice(0, 1).toLowerCase();
        let concatName = (lastName + spliceName).toLowerCase();
        if (player.ip) {
          player.url = `https://www.baseball-reference.com/players/gl.fcgi?id=${concatName}01&t=p&year=2018`;
        }
        if (player.rbi) {
          player.url = `https://www.baseball-reference.com/players/gl.fcgi?id=${concatName}01&t=b&year=2018`;
        }
        playerArray.push(player);
      });
      return playerArray;
    };
    $scope.showBatters = () =>{
        $scope.pitcherList = false;
        $scope.batterList = true;
    }
    $scope.showPitchers = () =>{
        $scope.batterList = false;
        $scope.pitcherList = true;
    }

    $scope.loadIndividualBatter = url => {
      $scope.loading = true;
      $scope.previousGames = null;
      $scope.modalImage = null;
      $scope.modalName = null;
      PlayerFactory.getBatterIndividual(url).then(playerData => {
        let statsArray = playerData.data;
        let lastOne = statsArray.length - 1;
        let firstSlice = statsArray.slice(0, lastOne);
        let firstSliceLength = firstSlice.length;
        let sliceNumber = firstSliceLength - 5;
        $scope.previousGames = firstSlice.slice(sliceNumber, firstSliceLength);
        if ($scope.previousGames[0] !== undefined) {
            $scope.modalImage = $scope.previousGames[0].imgUrl;
            $scope.modalName = $scope.previousGames[0].name;
            console.log($scope.previousGames);
            $scope.loading = false;
        } else {
            $scope.modalName = "Sorry, no data found";
        }
        $scope.loading = false;
      });
    };

    $scope.loadIndividualPitcher = url => {
      $scope.loading = true;
      $scope.previousGames = null;
      $scope.modalImage = null;
      $scope.modalName = null;
      PlayerFactory.getPitcherIndividual(url).then(playerData => {
        let statsArray = playerData.data;
        let lastOne = statsArray.length - 1;
        let firstSlice = statsArray.slice(0, lastOne);
        let firstSliceLength = firstSlice.length;
        let sliceNumber = firstSliceLength - 5;
        $scope.previousGames = firstSlice.slice(sliceNumber, firstSliceLength);
        if ($scope.previousGames[0] !== undefined) {
          $scope.modalImage = $scope.previousGames[0].imgUrl;
          $scope.modalName = $scope.previousGames[0].name;
          console.log($scope.previousGames);
          $scope.loading = false;
        } else {
          $scope.modalName = "Sorry, no data found";
        }
        $scope.loading = false;
      });
    };
    onLoad();
  });
