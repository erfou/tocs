var SeatService = require('app_modules/crud-api').seats.services;
var PassengerView = require('./passengerView');

var PassengerManager = {
    getAll : function(callback) {
        var allPassengers = []
        SeatService.getAllSeats(function(err, allSeats) {
            if(!err) {
                for(var seat of allSeats.seats) {
                    if(seat.currentPassenger) {
                        allPassengers.push(new PassengerView(seat.currentPassenger));
                    }
                }
                callback(null, allPassengers);
            } else {
                callback(err, null);
            }
        });
    }
};

module.exports = PassengerManager;