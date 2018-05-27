"use strict";

angular
    .module("FantasyBB")
    .controller("AuthCtrl", function ($scope, AuthFactory, $location) {
        $scope.account = {};

        $scope.register = () => {
            $scope.errorMsg = "";
            if ($scope.account.password !== $scope.account.passwordConf) {
                $scope.errorMsg =
                    "Password and confirmation don't match. Please try again";
                return null;
            }
            AuthFactory.createUser($scope.account).then(user => {
                AuthFactory.broadcastUserLogin(user);
                $location.path("/home"); //what should be the route here? ?user=<id> or /id or nothing..... Let's go with nothing, and save the user info to a factory before we re-route. Then we can ping the factory for user info once we get to the new route.
            });
        };

        $scope.login = () => {
            AuthFactory.loginUser($scope.account).then((user) => {
                AuthFactory.broadcastUserLogin(user);
                $location.path("/home");
            });
        };
    });
