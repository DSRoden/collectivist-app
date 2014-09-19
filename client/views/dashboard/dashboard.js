(function(){
  'use strict';

  angular.module('collectivist-app')
  .controller('DashboardCtrl', ['$scope', 'User', 'Dashboard', function($scope, User, Dashboard){
    $scope.surveys = [];
    $scope.title = 'DASHBOARD';

    User.user().then(function(response){
      $scope.user = response.data;
    });

    Dashboard.getSurveys().then(function(response){
      $scope.showSurvey = false;
      $scope.surveys = response.data.surveys;
    });

  }]);
})();

