(function(){
  'use strict';

  angular.module('collectivist-app')
  .controller('RegisterCtrl', ['$scope', '$location', 'User', function($scope, $location, User){
    $scope.user = {};

    function regSuccess(response){
      toastr.success('User successfully registered.');
      User.login($scope.user).then(success, failure);
    }

    function regFailure(response){
      toastr.error('Error during user registration, try again.');
      $scope.user = {};
    }

    $scope.register = function(){
      User.register($scope.user).then(regSuccess, regFailure);
    };

    //LOG IN FUNCTIONS
    function success(response){
      toastr.success('Successful login.');
      $location.path('/');
    }

    function failure(response){
      toastr.error('Error during login, try again.');
      $scope.user = {};
    }

  }]);
})();

