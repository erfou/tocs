'use strict';

angular.module('myApp').factory('SeatMapService', function($resource, settings){
   return $resource(
       settings.backendUrl + 'pnc/seat-map/service',
       {},
       {
            'get': {method:'GET', isArray: false}
       }
   ); 
});
