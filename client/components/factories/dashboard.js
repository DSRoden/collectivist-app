(function(){
  'use strict';

  angular.module('collectivist-app')
  .factory('Dashboard', ['$http', function($http){

    function getSurveys(){
      return $http.get('/surveys');
    }



    return {getSurveys:getSurveys};
  }]);
})();
