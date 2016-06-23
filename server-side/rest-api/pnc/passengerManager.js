var passengerService = require('app_modules/crud-api').passengers.services;
var PassengerView = require('./passengerView');

var PassengerManager = {
    getAll : function(callback) {
        var allPassengersView = [];
        passengerService.getAllPassengers(function(err, allPassengers) {
            if(!err) {
                for(var passenger of allPassengers) {
                    console.log("from manager: " + passenger.personnalInfos.birthdate);
                    allPassengersView.push(new PassengerView(passenger));
                }
                callback(null, allPassengersView);
            } else {
                callback(err, null);
            }
        });
    },
    getById : function(req, callback) {
        var passengerDetailsView = {
        };
        passengerService.getPassengerById(req, function(err, result) {
           if(!err) {
               if(result) {
                   passengerDetailsView.passengerView = new PassengerView(result);
                   callback(passengerDetailsView);
               } else {
                   callback({ error: "No passenger found for id: " + req.params.passenger_id }, null);
               }
           } else {
               callback(err, null);
           }
        });
    }
};

module.exports = PassengerManager;