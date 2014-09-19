(function(){
  'use strict';

  angular.module('collectivist-app')
  .factory('Survey', ['$http', function($http){

    function getSurvey(id){
      return $http.post('/survey', {id:id});
    }

    function submit(responses, surveyID){
      return $http.post('/results', {responses:responses, surveyID:surveyID});
    }

    return {getSurvey:getSurvey, submit:submit};
  }]);
})();
