'use strict';

angular.module('myApp').controller('ServiceCtrl', function($scope, $rootScope){

	var socket = io.connect('http://localhost:8080/pnc');

	socket.on('updateSeat', function (data) {
		$scope.$apply(function () {
		    
		        $scope.services.seatMapView = data;
		  
		});
        

		console.log(JSON.stringify(data));
	});

    $rootScope.loc = "Service";
    $rootScope.locA = false;
    
    $rootScope.seat = "Avion";
    $rootScope.logo = "icon-af icon-af-B-digital-avionenvol";
    $rootScope.lien = "/#/pnc/service";
    
     
    
  
    
});