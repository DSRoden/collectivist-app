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
    $scope.slider = {};
    $scope.response.value = '50';
    $scope.response.prediction = '50';
    $scope.opinions = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
    $scope.showQuestions = false;
    var id = $routeParams.surveyId;

     function ctrlValue($scope){
      $scope.response.value = $scope.response.value;
      $scope.options = {
        from: 0,
        to: 100,
        step: 1,
        dimension: ''
        //scale: [0, 'Strongly Disagree', 50, '|' , 100]
      };
    }
    ctrlValue($scope);

     function ctrlPrediction($scope){
      $scope.response.prediction = $scope.response.prediction;
      $scope.options = {
        from: 0,
        to: 100,
        step: 1,
        dimension: ''
        //scale: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
      };
    }
    ctrlPrediction($scope);


    User.user().then(function(response){
      $scope.user = response.data;
    });

    Survey.getSurvey(id).then(function(response){
      $scope.survey = response.data.survey;
      $scope.questions = response.data.questions;
      $scope.question = $scope.questions[$scope.qIndex];
      $scope.response = {qId:$scope.question._id, value: 50, prediction: 50};
      $scope.showSurvey = true;
    });

    $scope.addResponse = function(){
      var value = $scope.response.value,
          prediction = $scope.response.prediction;
      $scope.responses.push($scope.response);
      $scope.qIndex += 1;
      if($scope.qIndex === $scope.questions.length){
        $scope.showQuestions = !!!$scope.showQuestions;
        $scope.showSurvey = false;
        $scope.surveyCompleted = true;
        //call submit form function
      }else{
        $scope.question = $scope.questions[$scope.qIndex];
        $scope.response = {qId:$scope.question._id, value:value, prediction: prediction};
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

