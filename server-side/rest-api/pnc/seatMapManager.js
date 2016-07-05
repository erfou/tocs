var SeatService = require('app_modules/crud-api').seats.services;
var orderService = require('app_modules/crud-api').orders.services;
var ledsManager = require('app_modules/ledsManager');

var SeatInfosView = require('./seatInfosView');
var ServiceSeatMapView = require('./serviceSeatMapView');
var PassengerView = require('./passengerInfosView');



var SeatMapManager = {
    seatMap : function(typeOfView, callback) {
    	var serviceSeatMapView = new ServiceSeatMapView();
        ledsToLight = [];
        SeatService.getAllSeats(function(err, allSeats) {
            if(!err) {
                var listOfPassengersAway = [], nbPassengersUnbelted = 0, nbSeatsFree = 0, nbPassengers = 0, nbSeatsOccuped = 0;
//                console.log(allSeats);
                for(var seat of allSeats) {
                    if('security' == typeOfView) {
                        if(seat.currentPassenger) {
                            nbPassengers++;
                        }

                        if(!seat.occuped) {
                            nbSeatsFree++;
                            if(seat.currentPassenger) {
                                listOfPassengersAway.push(new PassengerView(seat.currentPassenger));
                            }
                        } else {
                            if(!seat.belted) {
                                nbPassengersUnbelted ++;
                                console.log("add led: " + seat._id);
                                ledsToLight.push(seat._id.substring(1, seat._id.length));
                            }
                            nbSeatsOccuped++;                            
                        }
                    }
                    serviceSeatMapView.seatMapView.push(new SeatInfosView(seat));
                }

                if('security' == typeOfView) {
                    ledsManager.activeSecurityMode(ledsToLight);
                    serviceSeatMapView.securityView = {};
                    if(listOfPassengersAway.length > 0) {
                        serviceSeatMapView.securityView.listOfPassengersAway = listOfPassengersAway;
                    }

                    serviceSeatMapView.securityView.nbPassengers = nbPassengers;
                    serviceSeatMapView.securityView.nbSeatsOccuped = nbSeatsOccuped;
                    serviceSeatMapView.securityView.nbPassengersMissing = nbPassengers - nbSeatsOccuped;
                    serviceSeatMapView.securityView.nbPassengersUnbelted = nbPassengersUnbelted;
                } else {
                    orderService.getAllOrdersFullPopulated(function(err, orders) {
                        if(!err) {
                            ledsManager.activeServiceMode(orders);
                        } else {
                            console.log(err);
                        }
                    });
                }
                callback(null, serviceSeatMapView);
            } else {
                callback(err, null);
            }
        });
    }
};

module.exports = SeatMapManager;
