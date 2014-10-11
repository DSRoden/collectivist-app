(function(){
  'use strict';

  angular.module('collectivist-app')
  .factory('Dashboard', ['$http', function($http){

    function getSurveys(){
      return $http.get('/surveys');
    }

    function getTaken(){
      return $http.get('/taken');
    }

    return {getSurveys:getSurveys, getTaken:getTaken};
  }]);
})();
