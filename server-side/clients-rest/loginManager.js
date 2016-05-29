var async = require("async");
var crudApi = require('app_modules/crud-api');

var pnrService = crudApi.pnrs.services;
var seatService = crudApi.seats.services;
var SeatView = crudApi.seats.view;

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
                var clientInfos = {};
                clientInfos.seat = seat;
                clientInfos.pnr = pnr;
                if(currentPassenger.ticket.seat != seat._id) {
                    if(currentPassenger.ticket.seat.fareClass != seat.fareClass) {
                        callback({ message: "Login failed.", details: "Wrong fare class: " + seat.fareClass + " instead of " + currentPassenger.ticket.seat.fareClass}, null);
                    } else {
                        currentPassenger.ticket.seat = seat._id;

                        pnrService.updatePnr(pnr, function(err, result) {
                            if(!err) {
                                clientInfos.pnr = result;
                                callback(null, result);
                            } else {
                                callback(err, null, null);
                            }
                        });
                    }
                }
                generateIdentificationToken(clientInfos, function(err, result) {
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

function generateIdentificationToken(clientInfos, callback) {
    callback(null, new Buffer(JSON.stringify(clientInfos)).toString('base64'));
    //console.log(new Buffer("SGVsbG8gV29ybGQ=", 'base64').toString('ascii'))
}

module.exports = loginManager;
