var seatServices = require("app_modules/crud-api").seats.services;

var seatAvaibilityHelper = {
    checkIfAvailable: function(seatInfos, callback) {
        seatServices.getSeatById(seatInfos._id, function(err, seat) {
            if(!err) {
                
                var isOccuped = false;
                
                if(hasPassenger(seat)) {
                    if(!samePassenger(seat.currentPassenger, seatInfos.currentPassenger)) {
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

function hasPassenger(seat) {
    var toReturn = false;
    if(seat.currentPassenger
        && seat.currentPassenger.personnalInfos 
        && seat.currentPassenger.personnalInfos.title) {
        
        toReturn = true;
    }
    return toReturn;
}
function samePassenger(passenger, toCompare) {
    var toReturn = false;
    if(passenger.personnalInfos.title == toCompare.personnalInfos.title
        && passenger.personnalInfos.firstname == toCompare.personnalInfos.firstname
        && passenger.personnalInfos.lastname == toCompare.personnalInfos.lastname) {
            toReturn = true;
    }
    return toReturn;
}

module.exports = seatAvaibilityHelper;
