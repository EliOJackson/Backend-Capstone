"use strict";

angular
  .module("FantasyBB")
  .controller("TeamCtrl", function($scope, PlayerFactory) {
    let currentUserId = null;

    $scope.$on("handleBroadcast", function(event, user) {
      $scope.user = user;
      $scope.currentUser = user;
    });


    $scope.season = () => {
      $scope.loading = true;
      PlayerFactory.getPlayersSeason().then(data => {
        $scope.batters = addUrl(data.data.batters);
        $scope.pitchers = addUrl(data.data.pitchers);
        $scope.loading = false;
      });
    };
    $scope.today = () => {
      $scope.loading = true;
      PlayerFactory.getPlayersToday().then(data => {
        $scope.batters = addUrl(data.data.batters);
        $scope.pitchers = addUrl(data.data.pitchers);
        $scope.loading = false;
      });
    };

    let addUrl = players => {
      let playerArray = [];
      players.forEach(player => {
        if (player.name.length !== 0) {
          let fullName = player.name;
          let splitName = fullName.split(" ");
          let spliceName = splitName.length > 0 ? splitName[0].slice(0, 2) : [];
          let lastName = splitName.length >= 1 ? splitName[1].slice(0, 5) : [];
          let lastNameFirstLetter =
            splitName.length >= 1 ? splitName[1].slice(0, 1).toLowerCase() : [];
          let concatName = (lastName + spliceName).toLowerCase();
          if (player.ip) {
            player.url = `https://www.baseball-reference.com/players/gl.fcgi?id=${concatName}01&t=p&year=2018`;
          }
          if (player.rbi) {
            player.url = `https://www.baseball-reference.com/players/gl.fcgi?id=${concatName}01&t=b&year=2018`;
          }
          playerArray.push(player);
        }
      });
      return playerArray;
    };

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
        $scope.modalImage = $scope.previousGames[0].imgUrl;
        $scope.modalName = $scope.previousGames[0].name;
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
        let firstSlice =
          statsArray.length > 0 ? statsArray.slice(0, lastOne) : [];
        let firstSliceLength = firstSlice.length;
        let sliceNumber = firstSliceLength - 5;
        $scope.previousGames =
          firstSlice.length > 0
            ? firstSlice.slice(sliceNumber, firstSliceLength)
            : [];
        if ($scope.previousGames[0] !== undefined) {
          $scope.modalImage = $scope.previousGames[0].imgUrl;
          $scope.modalName = $scope.previousGames[0].name;
          $scope.loading = false;
        } else {
          $scope.modalName = "Sorry, no data found";
        }
        $scope.loading = false;
      });
    };
  });
