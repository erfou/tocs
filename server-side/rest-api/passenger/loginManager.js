var async = require("async");
var crudApi = require('app_modules/crud-api');
var PassengerHelper = require('app_modules/passengerHelper');

var SeatService = crudApi.seats.services;

var Tokenizer = require('./tokenizer');

var loginManager = {
    login : function(req, callback) { 
        var loginForm = {
          token: "",
          links: [
            {
                rel: "Continue",
                herf: "/passenger/home/"
            }
          ]
        };

        async.waterfall([
            //get asked seat
            function(callback) {
                SeatService.getSeatById(req.body.seat_id, function(err, result) {
                    if(!err) {
                        callback(null, result);
                    } else {
                        callback(err, null);
                    }
                });
            },
            function(seat, callback) {
                changeCurrentPassenger(seat, req, function(err, seat, oldSeat) {
                    if(!err) {
                        callback(null, seat, oldSeat);
                    } else {
                        callback(err, null, null);
                    }
                });
            },
            function(seat, oldSeat, callback) {
                if(oldSeat) {
                    loginForm.warning = "Your old seat " + oldSeat._id + " is now free to other people.";
                }
                Tokenizer.tokenize(seat, function(err, token) {
                    if(!err) {
                        callback(null, token);
                    } else {
                        callback(err, null);
                    }
                });
            }
        ],
        // optional callback
        function(err, token) {
            if(!err) {
                loginForm.token = token;
                callback(null, loginForm);
            } else {
                callback(err, null);
            }
            // results is now equal to ['one', 'two']
        });
    }
};

function changeCurrentPassenger(seat, req, changeCurrentPassengerCallback) {
                var toCompare = { personnalInfos: { firstname: req.body.firstname, lastname: req.body.lastname } };
                //if has a passenger on this seat
                if(PassengerHelper.hasPassenger(seat)) {
                    //if passenger match, return seat infos
                    if(PassengerHelper.samePassenger(seat.currentPassenger, toCompare)) {
                        changeCurrentPassengerCallback(null, seat, null);
                    } else {
                        changeCurrentPassengerCallback({ message: "Seat allready reserved." }, null, null);
                    }
                //If seat is free
                } else {
                    //looking for the current seat of the  passenger (to free it)
                    async.waterfall([
                        function(callback) {
                            SeatService.getSeatByFirstAndLastName(req.body.firstname, req.body.lastname, function(err, oldSeat) {
                               if(!err) {
                                   if(oldSeat) {
                                       callback(null, oldSeat);
                                   } else {
                                       callback({ message:"no seat found for passenger: " + req.body.firstname + " " + req.body.lastname});
                                   }
                               } else {
                                   callback(err, null);
                               }
                            });
                        },
                        function(oldSeat, firstWaterFallCallback) {
                            if(oldSeat.fareClass == seat.fareClass) {
                                computePassenger(seat, oldSeat, function(err, currentSeatUpdated, oldUpdatedSeat) {
                                    if(!err) {
                                        firstWaterFallCallback(null, currentSeatUpdated, oldUpdatedSeat);
                                    } else {
                                        firstWaterFallCallback(err, null, null);
                                    }
                                });
                            } else {
                                firstWaterFallCallback({ message: 'Uncombinable fare classes'}, null, null);
                            }
                        }
                    ],
                    function(err, currentSeat, oldSeat) {
                        if(!err) {
                            changeCurrentPassengerCallback(null, currentSeat, oldSeat);
                        } else {
                            changeCurrentPassengerCallback(err, null, null);
                        }
                    });
                }
}

function computePassenger(currentSeat, oldSeat, computePassengerCallback) {
        //Copy the currentPassenger to the asked seat
        currentSeat.currentPassenger = JSON.parse(JSON.stringify(oldSeat.currentPassenger));
        //Free old seat
        oldSeat.currentPassenger = null;
        
        //update seats
        async.waterfall([
            function(callback) {
                SeatService.updateSeat(currentSeat, function(err, currentUpdatedSeat) {
                   if(!err) {
                        callback(null, currentUpdatedSeat);
                    } else {
                        callback(err, null);
                    }
                });
            },
            function(currentSeatUpdated, callback) {
                SeatService.updateSeat(oldSeat, function(err, oldUpdatedSeat) {
                   if(!err) {
                        callback(null, currentSeatUpdated, oldUpdatedSeat);
                    } else {
                        callback(err, null, null);
                    }
                });
            }
        ], function(err, currentSeatUpdated, oldUpdatedSeat) {
            if(!err) {
                computePassengerCallback(null, currentSeatUpdated, oldUpdatedSeat);
            } else {
                computePassengerCallback(err, null, null);
            }
        });
    
}

module.exports = loginManager;
