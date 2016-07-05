'use strict';

angular.module('myApp').factory('SeatMapSecurity', function($resource, settings){
   return $resource(
       settings.backendUrl + 'pnc/seat-map/security',
       {},
       {
            'get': {method:'GET', isArray: false},
		   'option': {method:'OPTION', isArray:false}
       }
   ); 
});