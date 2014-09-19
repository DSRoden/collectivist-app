(function(){
  'use strict';

  angular.module('collectivist-app')
  .factory('User', ['$http', function($http){

    function register(user){
      return $http.post('/register', user);
    }

    function login(user){
      return $http.post('/login', user);
    }

    function logout(){
      return $http.delete('/logout');
    }

    function user(){
      return $http.get('/user');
    }

    return {register:register, user:user, login:login, logout:logout};
  }]);
})();

