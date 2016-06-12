'use strict';

angular.module('myApp').controller('AutresCtrl', function($scope, $rootScope){

    $rootScope.loc = "Autres";
    $rootScope.locA=true;
    
    $scope.identity = [{name: 'Family', firstname:'First', gender:'Mr', language:'En', isFlyingBlue:'1'}];
    $scope.repas = [{title:'Repas', icon:'icon-af icon-af-B-digital-restauration-couverts'}];

});