var pnrServices = require("app_modules/crud-api").pnrs.services;

var seatAvaibilityHelper = {
    checkIfAvailable: function(seatId, callback) {
        pnrServices.getAllPnrs(function(err, result) {
            if(!err) {
                var isOccuped = false;
                for(var pnr of result.pnrs) {
                    for(var passenger of pnr.passengers) {
                        if(passenger.ticket.seat == seatId) {
                            isOccuped = true;
                            break;
                        }
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