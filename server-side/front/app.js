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
    		templateUrl: '/front/src/content/view.html'
    	})
    	.state('home', {
    		parent: 'main',
    		url: '/home',
    		controller: 'HomeCtrl',
    		templateUrl: '/front/src/content/home/view.html'
    	})
    	.state('repas', {
    		parent: 'main',
    		url: '/repas',
    		controller: 'RepasCtrl',
    		templateUrl: '/front/src/content/repas/view.html'
    	})
    	.state('collations', {
    		parent: 'main',
    		url: '/collations',
    		controller: 'CollationsCtrl',
    		templateUrl: '/front/src/content/collations/view.html'
    	})
        .state('autres', {
    		parent: 'main',
    		url: '/autres',
    		controller: 'AutresCtrl',
    		templateUrl: '/front/src/content/autres/view.html'
    	})
        .state('infos', {
    		parent: 'main',
    		url: '/infos',
    		controller: 'InfosCtrl',
    		templateUrl: '/front/src/content/infos/view.html'
    	})
        .state('login', {
    		url: '/login',
    		controller: 'LoginCtrl',
    		templateUrl: '/front/src/content/login/view.html'
    	});

}).run(function(){

});