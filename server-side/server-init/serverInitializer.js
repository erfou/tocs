var async = require('async');
var crudApi = require('app_modules/crud-api');
var passengerService = crudApi.passengers.services;

var schemaInfosList = [
    {
        service : crudApi.seats.services,
        mocksFileName : "seats"
    },{
        service : crudApi.passengers.services,
        mocksFileName : "passengers"
    }
    ,{
        service : crudApi.pnrs.services,
        mocksFileName : "pnrs"
    },{
        service : crudApi.products.services,
        mocksFileName : "products"
    },{
        service : crudApi.categories.services,
        mocksFileName : "categories"
    }
];
var SeatInitializer = {
    init : function(callback) {
        async.each(schemaInfosList,
            function(schemaInfos, callback) {
                initSchema(schemaInfos.service, schemaInfos.mocksFileName, function(err, result) {
                    if(!err) {
                        console.log(schemaInfos.mocksFileName + " correctly initialized !");
                        callback(null, schemaInfos.mocksFileName + " correctly initialized !");
                    } else {
                        callback("Error occured during " + schemaInfos.mocksFileName + " initialization: " + err, null);
                    }
                });
            },
            function(err) {
                if(!err) {
                    callback(null, "Server initialization completed.");
                } else {
                    callback("Server initialization failed: " + err, null);
                }
            });
    },
    initSeatPassengerCouple : function(callback) {
        var seatServices = crudApi.seats.services;
        var pnrServices = crudApi.pnrs.services;
        pnrServices.getAllPnrs(function(err, result) {
            if(!err) {
                async.each(result.pnrs,
                    function(pnr, callback) {
                        async.each(pnr.passengers,
                            function(passenger, callback) {
                                async.waterfall([
                                    function(callback) {
                                        seatServices.getSeatById(passenger.ticket.seat, function(err, seat) {
                                            if(!err) {
                                                callback(null, seat);
                                            } else {
                                                callback(err, null);
                                            }
                                        });
                                    },
                                    function(seat, callback) {
                                        passenger.seat = seat._id;
                                        passenger.pnr = pnr.record_locator;
                                        passengerService.addNewPassenger(passenger, function(err, result){
                                           if(!err) {
                                               callback(null, seat, result);
                                           } else {
                                               callback(err, null, null);
                                           }
                                        });
                                    }, function(seat, updatedPassenger) {
                                       seat.currentPassenger = updatedPassenger._id;
                                       seatServices.updateSeat(seat, function(err, updatedSeat) {
                                          if(!err) {
                                              callback(null, updatedSeat);
                                          } else {
                                              callback(err, null);
                                          }
                                       });
                                    }
                                ]);
                            }
                        );
                    }
                );
            } else {
                callback(err, null);
            }
        });
    }
};

function initSchema(service, mocksFileName, callback) {
    async.waterfall([
        function(callback) {
            service.deleteAll(function(err, result) {
                if(!err) {
                    callback(null);
                } else {
                    callback(err);
                }
            });
        },
        function(callback) {
            if(mocksFileName != "passengers") {
                var items = require('../mocks/' + mocksFileName);
                service.addAll(items, function(err, insertedPnrs) {
                    if(!err) {
                        callback(null, insertedPnrs);
                    } else {
                        callback(err, null);
                    }
                });
            } else {
                callback(null, null);
            }
        }
    ], function(err, result) {
        if(!err) {
            callback(null, result);
        } else {
            callback(err, null);
        }
    });
}

module.exports = SeatInitializer;
