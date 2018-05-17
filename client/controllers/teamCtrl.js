"use strict";

angular
  .module("FantasyBB")
  .controller("TeamCtrl", function($scope, PlayerFactory) {
    let currentUserId = null;

    $scope.$on("handleBroadcast", function(event, user) {
      $scope.user = user;
      console.log("Current 11111", $scope.user.username);
      $scope.currentUser = user;
    });

    $scope.console = () => {
      console.log("Emily is cool", $scope.players);
    };

    $scope.season = () => {
      $scope.loading = true;
      PlayerFactory.getPlayersSeason().then(data => {
        console.log("mydata", data.data);
        $scope.batters = addUrl(data.data.batters);
        $scope.pitchers = addUrl(data.data.pitchers);
        $scope.loading = false;
      });
    };
    $scope.today = () => {
      $scope.loading = true;
      PlayerFactory.getPlayersToday().then(data => {
        console.log("mydata", data.data);
        $scope.batters = addUrl(data.data.batters);
        $scope.pitchers = addUrl(data.data.pitchers);
        console.log(
          "emily is right, I am wrong",
          $scope.batters,
          $scope.pitchers
        );
        $scope.loading = false;
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

    $scope.loadIndividual = url => {
      $scope.loading = true;
      $scope.previousGames = null;
      $scope.modalImage = null;
      $scope.modalName = null;
      PlayerFactory.getPlayerIndividual(url).then(playerData => {
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

    // function load() {
    //     PlayerFactory.getPlayersSeason()
    //     .then(data => {
    //         console.log("mydata", data.data);
    //         $scope.batters = data.data.batters;
    //     })
    // }
    // load();
  });
