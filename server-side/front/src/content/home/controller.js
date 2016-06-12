'use strict';

angular.module('myApp').controller('HomeCtrl', function($scope, $rootScope){

    $scope.identity = [{name: 'Family', firstname:'First', gender:'Mr', language:'En', isFlyingBlue:'1'}];
    $scope.services = [{title:'Repas', url:"repas",  icon:'icon-af icon-af-B-digital-restauration-couverts'}, {title:'Collations', url:"collations", icon:'icon-af icon-af-B-digital-restauration-cafe'}, {title:'Autres services', url:"autres", icon:'icon-af icon-af-B-digital-carte-abonnement-2'}, {title:'Information', url:'infos', icon:'icon-af icon-af-A-basic-information35'}];
    
    $rootScope.loc = "Accueil";
    $rootScope.locA=false;

});