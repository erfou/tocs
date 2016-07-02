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
        .state('pnc', {
            abstract: true,
            url: '',
    		controller: 'PncCtrl',
    		templateUrl: 'src/content/pnc/view.html'
    	})
        .state('security', {
    		parent: 'pnc',
    		url: '/pnc/security',
    		controller: 'SecurityCtrl',
    		templateUrl: 'src/content/security/view.html'
    	})
        .state('passengers', {
    		parent: 'pnc',
    		url: '/pnc/passengers',
    		controller: 'PassengersCtrl',
    		templateUrl: 'src/content/passengers/view.html'
    	})
        .state('service', {
    		parent: 'pnc',
    		url: '/pnc',
    		controller: 'ServiceCtrl',
    		templateUrl: 'src/content/service/view.html'
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