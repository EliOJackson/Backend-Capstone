"use strict";

angular.module("FantasyBB").factory("RankingFactory", function($q, $http) {
    function getUnownedPlayers() {
      return $q((resolve, reject) => {
        $http.get(`players/unowned`).then(data => {
          resolve(data);
        });
      });
    }
    function getOwnedPlayers() {
      return $q((resolve, reject) => {
        $http.get(`players/rankings`).then(data => {
          resolve(data);
        });
      });
    }
    return { getUnownedPlayers, getOwnedPlayers};
})