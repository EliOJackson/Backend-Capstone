"use strict";

angular.module("FantasyBB").factory("PlayerFactory", function ($q, $http) {

    function getPlayersSeason() {
        return $q((resolve, reject) => {
            $http.get(`/players/season`)
                .then(data => {
                    resolve(data);
                });
        });
    };

    function getPlayersToday() {
        return $q((resolve, reject) => {
            $http.get(`/players/today`)
                .then(data => {
                    resolve(data);
                });
        });
    };

    function getPlayerIndividual(playerUrl) {
        console.log("shut up", playerUrl)
        let obj = {
            url: playerUrl
        }
        return $q((resolve, reject) => {
            $http.post("/players/individual", JSON.stringify(obj))
                .then(data => {
                    resolve(data);
                });
        });
    };
    return { getPlayersSeason, getPlayersToday, getPlayerIndividual };
});