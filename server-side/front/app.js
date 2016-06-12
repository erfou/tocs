'use strict';

angular.module('myApp', [
	'ngMessages',
	'ngResource',
	'ui.router'
]).config(function(settings, $stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/home');

    $stateProvider
    	.state('main', {
    		abstract: true,
			url: '',
    		controller: 'GlobalCtrl',
    		templateUrl: 'src/content/view.html'
    	})
    	.state('home', {
    		parent: 'main',
    		url: '/home',
    		controller: 'HomeCtrl',
    		templateUrl: 'src/content/home/view.html'
    	})
    	.state('repas', {
    		parent: 'main',
    		url: '/repas',
    		controller: 'RepasCtrl',
    		templateUrl: 'src/content/repas/view.html'
    	})
    	.state('collations', {
    		parent: 'main',
    		url: '/collations',
    		controller: 'CollationsCtrl',
    		templateUrl: 'src/content/collations/view.html'
    	})
        .state('autres', {
    		parent: 'main',
    		url: '/autres',
    		controller: 'AutresCtrl',
    		templateUrl: 'src/content/autres/view.html'
    	})
        .state('infos', {
    		parent: 'main',
    		url: '/infos',
    		controller: 'InfosCtrl',
    		templateUrl: 'src/content/infos/view.html'
    	})
        .state('login', {
    		url: '/login',
    		controller: 'LoginCtrl',
    		templateUrl: 'src/content/login/view.html'
    	});

}).run(function(){

});