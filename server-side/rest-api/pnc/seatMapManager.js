var SeatService = require('app_modules/crud-api').seats.services;
var SeatInfosView = require('./seatInfosView');
var ServiceSeatMapView = require('./serviceSeatMapView');
var PassengerView = require('./passengerView');

var SeatMapManager = {
    seatMap : function(req, typeOfView, callback) {
    	var serviceSeatMapView = new ServiceSeatMapView();
        SeatService.getAllSeats(function(err, allSeats) {
            if(!err) {
                var listOfPassengersAway = [], nbSeatsFree = 0, nbPassengers = 0, nbSeatsOccuped = 0;
                for(var seat of allSeats.seats) {
                    if('security' == typeOfView) {
                        if(seat.currentPassenger) {
                            nbPassengers++;
                        }

                        if(seat.occuped === false ) {
                            nbSeatsFree++;
                            if(seat.currentPassenger) {
                                listOfPassengersAway.push(new PassengerView(seat.currentPassenger));
                            }
                        } else {
                            nbSeatsOccuped++;                            
                        }
                    }
                    serviceSeatMapView.seatMapView.push(new SeatInfosView(seat));
                }
                if('security' == typeOfView) {
                    serviceSeatMapView.securityView = {};
                    if(listOfPassengersAway.length > 0) {
                        serviceSeatMapView.securityView.listOfPassengersAway = listOfPassengersAway;
                    }

                    serviceSeatMapView.securityView.nbPassengers = nbPassengers;
                    serviceSeatMapView.securityView.nbSeatsOccuped = nbSeatsOccuped;
                    serviceSeatMapView.securityView.nbPassengersMissing = nbPassengers - nbSeatsOccuped;
                }
                callback(null, serviceSeatMapView);
            } else {
                callback(err, null);
            }
        });
    }
};

module.exports = SeatMapManager;
