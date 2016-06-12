'use strict';

angular.module('myApp').controller('RepasCtrl', function($scope, $rootScope){

	$rootScope.loc = "Repas";
    $rootScope.locA=true;
    
    $scope.identity = [{name: 'Family', firstname:'First', gender:'Mr', language:'En', isFlyingBlue:'1'}];
    $scope.repas = [{title:'Repas', icon:'icon-af icon-af-B-digital-restauration-couverts'}];
    
});