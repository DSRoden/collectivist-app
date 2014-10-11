(function(){
  'use strict';

  angular.module('collectivist-app')
  .controller('DashboardCtrl', ['$scope', 'User', 'Dashboard', function($scope, User, Dashboard){
    $scope.surveys = [];
    $scope.takenSurveys = [];
    $scope.user = {};
    $scope.title = 'DASHBOARD';
    $scope.showAll = true;

    Dashboard.getSurveys().then(function(response){
      $scope.surveys = response.data.surveys;
      $scope.showMine = false;
      $scope.showAll = true;
    });

    User.user().then(function(response){
      console.log(response.data);
      $scope.user = response.data;
    });

    $scope.allSurveys = function(){
      Dashboard.getSurveys().then(function(response){
        $scope.surveys = response.data.surveys;
        $scope.showMine = false;
        $scope.showAll = true;
      });
    };

    $scope.mySurveys = function(){
      if(!$scope.user.taken){
      $scope.noneTaken = true;
      } else{
        Dashboard.getTaken().then(function(response){
          $scope.takenSurveys = response.data.surveys;
          $scope.showMine = true;
          $scope.showAll = false;
          console.log($scope.showMine);
          console.log($scope.showAll);
        });
        }
    };
  }]);
})();

