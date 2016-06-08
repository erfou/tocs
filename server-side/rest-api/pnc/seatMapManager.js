var SeatService = require('app_modules/crud-api').seats.services;
var SeatInfosView = require('./seatInfosView');
var ServiceSeatMapView = require('./serviceSeatMapView');

var SeatMapManager = {
    seatMap : function(req, typeOfView, callback) {
    	var serviceSeatMapView = new ServiceSeatMapView();
        SeatService.getAllSeats(function(err, allSeats) {
            if(!err) {
                var listOfMissingPassengers = [], nbSeatsFree = 0, nbPassengers = 0, nbSeatsOccuped = 0;
                if('security' == typeOfView) {
                    for(var seat of allSeats.seats) {
                        if(seat.currentPassenger) {
                            nbPassengers++;
                        }

                        if(seat.occuped === false ) {
                            nbSeatsFree++;
                            if(seat.currentPassenger) {
                                listOfMissingPassengers.push(seat.currentPassenger);
                            }
                        } else {
                            nbSeatsOccuped++;                            
                        }
                        serviceSeatMapView.seatMapView.push(new SeatInfosView(seat));
                    }
                    
                    serviceSeatMapView.securityView = {};
                    if(listOfMissingPassengers.length) {
                        serviceSeatMapView.securityView.listOfMissingPassengersView = listOfMissingPassengers;
                    }

                    serviceSeatMapView.securityView.nbSeatsFree = nbSeatsFree;
                    serviceSeatMapView.securityView.nbPassengers = nbPassengers;
                    serviceSeatMapView.securityView.nbSeatsOccuped = nbSeatsOccuped;
                }
                callback(null, serviceSeatMapView);
            } else {
                callback(err, null);
            }
        });
    }
};

module.exports = SeatMapManager;
