var passengerService = require('app_modules/crud-api').passengers.services;
var PassengerInfosView = require('./passengerInfosView');
var PassengerListView = require('./passengerListView');

var PassengerManager = {
    getAll : function(callback) {
        var passengerListView = new PassengerListView();
        //var allPassengersView = [];
        passengerService.getAllPassengers(function(err, allPassengers) {
            if(!err) {
                for(var passenger of allPassengers) {
                    console.log("from manager: " + passenger.personnalInfos.birthdate);
                    passengerListView.passengerInfosView.push(new PassengerInfosView(passenger));
                }
                callback(null, passengerListView);
            } else {
                console.log(err);
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
                   passengerDetailsView.passengerView = new PassengerInfosView(result);
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