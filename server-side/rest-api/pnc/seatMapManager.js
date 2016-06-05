var SeatService = require('app_modules/crud-api').seats.services;

var SeatMapManager = {
    seatMap : function(req, typeOfView, callback) {
        SeatService.getAllSeats(function(err, result) {
            if(!err) {
                callback(null, result);
            } else {
                callback(err, null);
            }
        });
    }
};

module.exports = SeatMapManager;
