var seatServices = require("app_modules/crud-api").seats.services;
var PassengerHelper = require('./passengerHelper');

var seatAvaibilityHelper = {
    checkIfAvailable: function(seatInfos, callback) {
        seatServices.getSeatById(seatInfos._id, function(err, seat) {
            if(!err) {
                
                var isOccuped = false;
                
                if(PassengerHelper.hasPassenger(seat)) {
                    if(!PassengerHelper.samePassenger(seat.currentPassenger, seatInfos.currentPassenger)) {
                        isOccuped = true;
                    }
                }
                
                if(isOccuped) {
                    callback(null, false);
                } else {
                    callback(null, true);
                }
            } else {
                callback(err, null);
            }
        });
    }
};

module.exports = seatAvaibilityHelper;
