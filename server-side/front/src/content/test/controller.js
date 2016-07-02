'use strict';

angular.module('myApp').controller('TestCtrl', function($scope, $rootScope, SeatMapService){

    
    $scope.services = SeatMapService.get();
    
    
    
    $scope.identity = [{name: 'Family', firstname:'First', gender:'Mr', language:'En', isFlyingBlue:'1'}];
        
    $rootScope.loc = "Accueil";
    $rootScope.locA=false;

});