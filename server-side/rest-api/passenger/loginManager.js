var async = require("async");
var crudApi = require('app_modules/crud-api');

var PnrService = crudApi.pnrs.services;
var SeatService = crudApi.seats.services;

var Tokenizer = require('./tokenizer');
var SeatAvaibilityHelper = require('./seatAvaibilityHelper');
var PassengerHelper = require('./passengerHelper');

var loginManager = {
    login : function(req, callback) { 
        console.log("firstname from login: " + req.body.firstname);
        var loginForm = {
          token: "",
          links: [
            {
                rel: "Continue",
                herf: "/passenger/home/"
            }
          ]
        };

        var toCompare = { personnalInfos: { firstname: req.body.firstname, lastname: req.body.lastname } };

        async.waterfall([
            //get asked seat
            function(callback) {
                SeatService.getSeatById(req.body.seat_id, function(err, result) {
                    if(!err) {
                        callback(null, result);
                    } else {
                        console.log(err);
                        callback(err, null);
                    }
                });
            },
            function(seat, callback) {
                //if has a passenger on this seat
                if(PassengerHelper.hasPassenger(seat)) {
                    //if passenger match, return seat infos
                    if(PassengerHelper.samePassenger(seat.currentPassenger, toCompare)) {
                        callback(null, seat, null);
                    } else {
                        callback({ message: "Seat allready reserved." }, null, null);
                    }
                //If seat is free
                } else {
                    var oldSeat;
                    console.log("from else");
                    //looking for the current seat of the passenger (to free it)
                    async.waterfall([
                        function(callback) {
                            SeatService.getAllSeats(function(err, result) {
                               if(!err) {
                                   console.log("from getAllSeats");
                                   callback(null, result.seats);
                               } else {
                                   callback(err, null);
                               }
                            });
                        },
                        function(seats, callback) {
                            async.each(seats,
                                function(seatInList, callback) {
                                   console.log("from async.each on seat list");
                                    var passengerOfSeat = seatInList.currentPassenger;
                                    if(PassengerHelper.samePassenger(passengerOfSeat, toCompare)) {
                                       oldSeat = JSON.parse(JSON.stringify(seatInList));
                                        seatInList.currentPassenger = null;
                                        SeatService.updateSeat(seatInList, function(err, updatedSeat) {
                                            if(!err) {
                                                console.log("updatedSeat from updateSeat: " + JSON.stringify(updatedSeat));
                                                callback(null, updatedSeat);
                                            } else {
                                                callback(err, null);
                                            }
                                        });
                                    } else {
                                        callback(null, null);
                                    }
                                },
                                function(err) {
                                    if(!err) {
                                        if(oldSeat) {
                                            callback(null, oldSeat);
                                        } else {
                                            callback({ message: "Passenger not found." }, null);
                                        }
                                    } else {
                                        callback(err, null);
                                    }
                                }
                            );
                        }
                    ],
                    function(err, oldSeat) {
                        if(!err) {
                            console.log('oldSeat from waterfall callback: ' + JSON.stringify(oldSeat));
                            console.log('seat from waterfall callback: ' + JSON.stringify(seat));
                            callback(null, seat, oldSeat);
                        } else {
                            callback(err, null, null);
                        }
                    });
                    //set new current passenger and delete it from original seat
                }
            },
            function(err, seat, oldSeat) {
                if(!err) {
                    console.log("from last waterfall callback");
                    if(oldSeat) {
                        loginForm.prototype.warning = "Your old seat is now free to other people.";
                    }
                    Tokenizer.tokenize(seat, function(err, token) {
                        if(!err) {
                            callback(null, token);
                        } else {
                            callback(err, null);
                        }
                    });
                }
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

module.exports = loginManager;
