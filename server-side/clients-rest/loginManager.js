var async = require("async");
var crudApi = require('app_modules/crud-api');

var PnrService = crudApi.pnrs.services;
var SeatService = crudApi.seats.services;
var Tokenizer = require('./tokenizer');
var SeatAvaibilityHelper = require('./seatAvaibilityHelper');

var loginManager = {
    login : function(req, callback) { 
        console.log("firstname from login: " + req.body.firstname);
        var loginForm = {
          token: "",
          links: [
            {
                rel: "Continue",
                herf: "/clients/home/"
            }
          ]
        };
        
        async.waterfall([
            function(callback) {
                PnrService.getPnrById(req.body.record_locator, function(err, result) {
                    if(!err) {
                        callback(null, result);
                    } else {
                        console.log(err);
                        callback(err, null);
                    }
                });
            },
            function(pnr, callback) { 
                SeatService.getSeatById(req.body.seat_id, function(err, result) {
                    if(!err) {
                        callback(null, pnr, result);
                    } else {
                        console.log(err);
                        callback(err, pnr, null);
                    }
                });
            },
            function(pnr, seat, callback) {
                var currentPassenger = getCurrentPassanger.call(this, pnr.passengers, req.body.firstname, req.body.lastname);
                if(currentPassenger) {
                    var clientInfos = {};
                    clientInfos.seat = seat;
                    clientInfos.pnr = pnr;
                    console.log("seat from currentPassenger: " + currentPassenger.ticket.seat + " from db: " + seat._id);
                    if(currentPassenger.ticket.seat != seat._id) {
                        console.log("fareClass from currentPassenger: " + currentPassenger.ticket.fareClass + " from db: " + seat.fareClass);
                        if(currentPassenger.ticket.fareClass != seat.fareClass) {
                            callback({ message: "Login failed.", details: "Wrong fare class: " + seat.fareClass + " instead of " + currentPassenger.ticket.fareClass}, null);
                        } else {
                            SeatAvaibilityHelper.checkIfAvailable(seat._id, function(err, isAvailable) {
                                if(!err) {
                                    if(isAvailable) {
                                        currentPassenger.ticket.seat = seat._id;
                
                                        PnrService.updatePnr(pnr, function(err, result) {
                                            if(!err) {
                                                clientInfos.pnr = result;
                                                callback(null, clientInfos);                
                                            } else {
                                                callback(err, null, null);
                                            }
                                        });
                                    } else {
                                        callback({ message: "Login failed.", details: "Seat already occuped"}, null);
                                    }
                                }
                            });
                        }
                    } else {
                        callback(null, clientInfos);                
                    }
                } else {
                    callback({ message: "Login failed.", details: "Wrong passenger. List of passengers for PNR " + pnr.record_locator + ": " + pnr.passengers}, null);
                }
            },
            function (clientInfos, callback) {
                        Tokenizer.tokenize(clientInfos, function(err, result) {
                            if(!err) {
                                callback(null, result);
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

function getCurrentPassanger(passengers, firstname, lastname) {
    var currentPassenger;
    console.log("passengers from getCurrentPassanger: " + passengers);
    for (var passenger of passengers) {
        if(passenger.personnalInfos.firstname == firstname && passenger.personnalInfos.lastname == lastname) {
            console.log("passenger found: " + passenger);
            currentPassenger = passenger;
            break;
        }
    }
    console.log("from getCurrentPassanger: " + currentPassenger);
    return currentPassenger;
}

module.exports = loginManager;
