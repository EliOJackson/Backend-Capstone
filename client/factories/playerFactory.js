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
    return { getPlayersSeason };
});