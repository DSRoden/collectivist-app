(function(){
  'use strict';

  angular.module('collectivist-app')
  .factory('Results', ['$http', function($http){

    function getResults(id){
      return $http.post('/getresults/', {id:id});
    }


    return {getResults:getResults};
  }]);
})();
