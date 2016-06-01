var pnrServices = require("app_modules/crud-api").pnrs.services;
var seatAvaibilityHelper = {
    checkIfAvailable: function(seatId, callback) {
        pnrServices.getAllPnrs(function(err, pnrs) {
            if(!err) {
                console.log("pnrs from seatAvaibilityHelper: " + JSON.stringify(pnrs));
                var isOccuped = false;
                for(var pnr of pnrs.pnrs) {
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