var pnrService = require("../pnrs").services;
var seatService = require('../seats').services;
var SeatView = require('../seats').view;
var async = require("async");

var loginManager = {
    login : function(req, callback) { 
        console.log("firstname from login: " + req.body.firstname);
        var loginForm = {
          seatView: {},
          pnr: {},
          links: [
            {
                rel: "Continue",
                herf: "/clients/home/"
            }
          ]
        };
        
        async.waterfall([
            function(callback) {
                pnrService.getPnrById(req.body.record_locator, function(err, result) {
                    if(!err) {
                        callback(null, result);
                    } else {
                        console.log(err);
                        callback(err, null);
                    }
                });
            },
            function(pnr, callback) { 
                seatService.getSeatById(req.body.seat_id, function(err, result) {
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
                console.log("from async callback: " + currentPassenger);
                console.log("currentPassenger._id from async callback: " + currentPassenger._id);
                if(currentPassenger.ticket.seat != seat._id) {
                    if(currentPassenger.ticket.seat.fareClass != seat.fareClass) {
                        callback({ message: "Login failed.", details: "Wrong fare class: " + seat.fareClass + " instead of " + currentPassenger.ticket.seat.fareClass}, null);
                    } else {
                        currentPassenger.ticket.seat = seat._id;
                        pnrService.updatePnrAfterLogin(pnr, function(err, result) {
                            if(!err) {
                                callback(null, result, seat);
                            } else {
                                callback(err, null, null);
                            }
                        });
                    }
                } else {
                    callback(null, pnr, seat);
                }

                
            }
        ],
        // optional callback
        function(err, pnr, seat) {
            if(!err) {
                loginForm.seatView = new SeatView(seat);
        		loginForm.pnr = pnr;	
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
        console.log("from list of passenger: " + passenger);
        console.log("from req: " + firstname + " " + lastname);
        console.log("from persoInf: " + passenger.personnalInfos.firstname + " " + passenger.personnalInfos.lastname);
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
