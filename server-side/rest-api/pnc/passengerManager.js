var SeatService = require('app_modules/crud-api').seats.services;
var passengerService = require('app_modules/crud-api').passengers.services;
var PassengerView = require('./passengerView');

var PassengerManager = {
    getAll : function(callback) {
        var allPassengersView = []
        passengerService.getAllPassengers(function(err, allPassengers) {
            if(!err) {
                for(var passenger of allPassengers) {
                    console.log("from manager: " + passenger.personnalInfos.birthdate);
                    allPassengersView.push(new PassengerView(passenger));
                }
                callback(null, allPassengers);
            } else {
                callback(err, null);
            }
        });
    }
};

module.exports = PassengerManager;