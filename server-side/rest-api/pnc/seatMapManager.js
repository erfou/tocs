var SeatService = require('app_modules/crud-api').seats.services;
var SeatInfosView = require('./seatInfosView');
var ServiceSeatMapView = require('./serviceSeatMapView');

var SeatMapManager = {
    seatMap : function(req, typeOfView, callback) {
    	var serviceSeatMapView = new ServiceSeatMapView();
        SeatService.getAllSeats(function(err, allSeats) {
            if(!err) {
            	for(var seat of allSeats.seats) {
            		serviceSeatMapView.seatMapView.push(new SeatInfosView(seat));
            	}            	
                callback(null, serviceSeatMapView);
            } else {
                callback(err, null);
            }
        });
    }
};

module.exports = SeatMapManager;
