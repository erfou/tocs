var SeatService = require('app_modules/crud-api').seats.services;
var ledsManager = require('./ledsManager');

var SeatInfosView = require('./seatInfosView');
var ServiceSeatMapView = require('./serviceSeatMapView');
var PassengerView = require('./passengerInfosView');



var SeatMapManager = {
    seatMap : function(req, typeOfView, callback) {
    	var serviceSeatMapView = new ServiceSeatMapView();
        ledsToLight = [];
        SeatService.getAllSeats(function(err, allSeats) {
            if(!err) {
                var listOfPassengersAway = [], nbSeatsFree = 0, nbPassengers = 0, nbSeatsOccuped = 0;
                console.log(allSeats);
                for(var seat of allSeats) {
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
                            if(!seat.belted) {
                                console.log("add led: " + seat._id);
                                ledsToLight.push(seat._id.substring(1, seat._id.length));
                            }
                            nbSeatsOccuped++;                            
                        }
                    }
                    serviceSeatMapView.seatMapView.push(new SeatInfosView(seat));
                }
                if('security' == typeOfView) {
                    manageLeds.call(this, ledsToLight);
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

function manageLeds(ledsToLight) {
    console.log("shuting down leds...");
    ledsManager.shutDownAll(function(err,result) {
//        if(!err) {
           console.log("start leds light...");
            for(var led of ledsToLight) {
                ledsManager.lightIt(led, "R");
            }
//        } else {
//            console.log("leds can't shuting down, we don't light leds");
//        }
    })
}

module.exports = SeatMapManager;
