(function(){
  'use strict';

  angular.module('collectivist-app', ['ngRoute', 'LocalForageModule'])
  .config(['$routeProvider', '$httpProvider', '$localForageProvider', function($routeProvider, $httpProvider, $localForageProvider){
    $routeProvider
    .when('/', {templateUrl:'/views/home/home.html', controller:'HomeCtrl'})
    .when('/register',          {templateUrl:'/views/register/register.html',   controller:'RegisterCtrl'})
    .when('/login',             {templateUrl:'/views/login/login.html',         controller:'LoginCtrl'})
    .when('/logout',            {templateUrl:'/views/logout/logout.html',       controller:'LogoutCtrl'})
    .when('/dashboard',         {templateUrl:'/views/dashboard/dashboard.html', controller:'DashboardCtrl'})
    .when('/surveys/:surveyId', {templateUrl:'/views/surveys/surveys.html',     controller:'SurveysCtrl'})
    .when('/results/:surveyId', {templateUrl:'/views/results/results.html',     controller:'ResultsCtrl'})
    .when('/about',   {templateUrl:'/views/about/about.html',     controller:'AboutCtrl'})
    .otherwise({redirectTo:'/'});

    $httpProvider.interceptors.push('HttpInterceptor');
    $localForageProvider.config({name:'collectivist-app', storeName:'cache', version:1.0});
  }]);
})();

