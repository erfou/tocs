'use strict';

angular.module('myApp').factory('BookingsService', function($resource, settings){
   return $resource(
       settings.backendUrl + 'pnc/bookings/',
       {},
       {
            'get': {method:'GET', isArray: false}
       }
   ); 
});
