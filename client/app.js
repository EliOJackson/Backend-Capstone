"use strict";

angular.module("FantasyBB", ["ngRoute"]).config($routeProvider => {
    $routeProvider
        .when("/", {
            templateUrl: "partials/auth-form.html",
            controller: "AuthCtrl"
        })
        .when("/home", {
            templateUrl: "partials/home.html",
            controller: "HomeCtrl"
        })
        .otherwise("/");
});

angular
    .module("FantasyBB")
    .run(($rootScope, $location, $route, $window, AuthFactory) => {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            AuthFactory.setUserStatus().then(() => {
                console.log("user", AuthFactory.getCurrentUser());
                console.log("next", next);
                AuthFactory.broadcastUserLogin(AuthFactory.getCurrentUser());
            });
        });
    });