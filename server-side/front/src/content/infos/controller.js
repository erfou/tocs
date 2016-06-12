'use strict';

angular.module('myApp').controller('InfosCtrl', function($scope, $rootScope){
    
    $rootScope.loc = "Informations";
    $rootScope.locA=true;
    
    $scope.identity = {name: 'DUPONT', firstname:'Jean', gender:'Mr', language:'Fr', isFlyingBlue:'1'};
    $scope.repas = [{title:'Repas', icon:'icon-af icon-af-B-digital-restauration-couverts'}];

});