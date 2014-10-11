(function(){
  'use strict';

  angular.module('collectivist-app')
  .controller('ResultsCtrl', ['$scope', 'User', 'Results','$routeParams', 'Survey', function($scope, User, Results, $routeParams, Survey){
    $scope.title = 'RESULTS';

    User.user().then(function(response){
      $scope.user = response.data;
    });

    var id = $routeParams.surveyId;

    Survey.getSurvey(id).then(function(response){
      $scope.survey = response.data.survey;
      $scope.questions = response.data.questions;
    });

    Results.getResults(id).then(function(response){
      //debugger;
      $scope.results = response.data.syncScores;
      $scope.avg = response.data.avgVals;
    });

  }]);
})();

