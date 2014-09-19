(function(){
  'use strict';

  angular.module('collectivist-app')
  .controller('SurveysCtrl', ['$scope', 'User', 'Survey', '$routeParams', '$location', function($scope, User, Survey, $routeParams, $location){
    $scope.surveys = [];
    $scope.questions = [];
    $scope.question = null;
    $scope.responses = [];
    $scope.response = {};
    $scope.title = 'SURVEYS';
    $scope.qIndex = 0;

    var id = $routeParams.surveyId;

    User.user().then(function(response){
      $scope.user = response.data;
    });

    Survey.getSurvey(id).then(function(response){
      $scope.survey = response.data.survey;
      $scope.questions = response.data.questions;
      $scope.question = $scope.questions[$scope.qIndex];
      $scope.response = {qId:$scope.question._id};
      $scope.showSurvey = true;
    });

    $scope.addResponse = function(){
      $scope.responses.push($scope.response);
      $scope.qIndex += 1;
      if($scope.qIndex === $scope.questions.length){
        $scope.showSurvey = false;
        $scope.surveyCompleted = true;
        //call submit form function
      }else{
        $scope.question = $scope.questions[$scope.qIndex];
        $scope.response = {qId:$scope.question._id};
      }

    };

    $scope.submitResponses = function(){
      Survey.submit($scope.responses, $scope.survey._id).then(function(response){
        //$scope.results = response.data.results.syncScores;
        //$scope.avg     = response.data.results.avgVals;
        $location.path('/results/' + $scope.survey._id);
        //console.log('RESPONSE.DATA.RESULTS>>>>>', response.data.results);
      });
    };


  }]);
})();

