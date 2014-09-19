(function(){
  'use strict';

  angular.module('collectivist-app')
  .controller('ResultsCtrl', ['$scope', 'User', 'Results','$routeParams', function($scope, User, Results, $routeParams){
    $scope.title = 'RESULTS';

    User.user().then(function(response){
      $scope.user = response.data;
    });

    var id = $routeParams.surveyId;

    Results.getResults(id).then(function(response){
      //debugger;
      $scope.results = response.data.syncScores;
      $scope.avg = response.data.avgVals;
    });

  }]);
})();

