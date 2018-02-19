var app = angular.module('templateApp', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');   
    var homeState = {
        name: 'home',
        url: '/',
        templateUrl: '../views/home.html',
        controller: 'HomeCtrl'
    }    

    $stateProvider.state(homeState);   

    // use the HTML5 History API
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});
