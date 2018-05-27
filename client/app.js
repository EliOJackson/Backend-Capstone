"use strict";

angular.module("FantasyBB", ["ngRoute"]).config($routeProvider => {
    $routeProvider
      .when("/", {
        templateUrl: "partials/auth-form.html",
        controller: "AuthCtrl"
      })
      .when("/login", {
        templateUrl: "partials/login.html",
        controller: "AuthCtrl"
      })
      .when("/home", {
        templateUrl: "partials/home.html",
        controller: "HomeCtrl"
      })
      .when("/myteam/:id", {
        templateUrl: "partials/teamview.html",
        controller: "TeamCtrl"
      })
      .when("/rankings", {
        templateUrl: "partials/rankings.html",
        controller: "RankingsCtrl"
      })
      .otherwise("/");
});

angular
    .module("FantasyBB")
    .run(($rootScope, $location, $route, $window, AuthFactory) => {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            AuthFactory.setUserStatus().then(() => {
                AuthFactory.broadcastUserLogin(AuthFactory.getCurrentUser());
            });
        });
    });