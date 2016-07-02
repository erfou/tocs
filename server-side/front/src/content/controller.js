'use strict';

angular.module('myApp').controller('GlobalCtrl', function($rootScope, $scope){
    
    
    $rootScope.loc = "Accueil";
    $rootScope.locA = false;
    
    $rootScope.seat = "Siège ??";
    $rootScope.logo = "icon-af-B-digital-siege";
    $rootScope.lien = "/#/home";

});