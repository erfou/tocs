'use strict';

angular.module('myApp').controller('PncCtrl', function($scope, $rootScope, SeatMapService, settings, $window){

    var socket = io.connect('http://localhost:8080/pnc');
    
    $scope.services = SeatMapService.get();
    
    socket.on('updateSeat', function (data) {
    $scope.$apply(function () {
        $scope.services.seatMapView = data;
        $window.location.reload();

    });

    });
    
    $rootScope.loc = "SeatMap";
    $rootScope.locA=false;
    
    $rootScope.logo = "icon-af icon-af-B-digital-avionenvol";
    $rootScope.lien = "/#/pnc";

    
    $scope.openNav = function() {
		$("#mySidenav").width("200px");
		$("#burger-button-show").hide();
		$("#burger-button-hide").show();
	};

	/* Set the width of the side navigation to 0 */
	$scope.closeNav = function() {
		$("#mySidenav").width("0px");
		$("#burger-button-show").show();
		$("#burger-button-hide").hide();
	};
    
    
    var switchOptions = {
			state: false,
			size: null,
			animate: true,
			disabled: false,
			readonly: false,
			indeterminate: false,
			inverse: false,
			radioAllOff: false,
			onColor: "primary",
			offColor: "default",
			onText: "Services",
			offText: "Sécurité",
			labelText: "Mode",
			handleWidth: "auto",
			labelWidth: "",
			baseClass: "bootstrap-switch",
			wrapperClass: "wrapper",
			onInit: function() {},
			onSwitchChange: function() {
				var state = $("[name='my-checkbox']").bootstrapSwitch('state');
				if(state){
					$("#service-panel").slideDown(700);
					$("#security-panel").slideUp(700);
				} else if(!state){
					$("#security-panel").slideDown(700);
					$("#service-panel").slideUp(700);
				}
			}
    };
    
    //security switch
		$("[name='my-checkbox']").bootstrapSwitch(switchOptions);
    
    /* Set the width of the side navigation to 250px */
	
		

 



});