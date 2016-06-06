var SeatService = require('app_modules/crud-api').seats.services;
var SeatInfosView = require('./seatInfosView');

var SeatMapManager = {
    seatMap : function(req, typeOfView, callback) {
    	var seatMapView = {
    		 seatInfosViews : []
    	};
        SeatService.getAllSeats(function(err, allSeats) {
            if(!err) {
            	for(var seat of allSeats.seats) {
            		seatMapView.seatInfosViews.push(new SeatInfosView(seat));
            	}            	
                callback(null, seatMapView);
            } else {
                callback(err, null);
            }
        });
    }
};

module.exports = SeatMapManager;
