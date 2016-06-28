var async = require('async');
var seatService = require('app_modules/crud-api').seats.services;

var Tokenizer = {
    tokenize : function (passenger, callback) {

        if(passenger.seat._id) {
            passenger.seat = passenger.seat._id;
        }
        if(passenger.pnr._id) {
            passenger.pnr = passenger.pnr._id;
        }
        callback(null, new Buffer(JSON.stringify(passenger)).toString('base64'));
    },
    detokenize : function (token, callback) {
        async.waterfall([
           function(callback) {
               callback(null, JSON.parse(new Buffer(token, 'base64').toString('ascii')));
           },
           function(passenger, callback) {
               if(!passenger.seat._id) {
                    seatService.getSeatById(passenger.seat, function(err, result){
                        if(!err) {
                            passenger.seat = result;
                            callback(null, passenger);
                        } else {
                            callback(err, null);
                        }
                    });
               } else {
                   callback(null, passenger);
               }
           }
        ], function(err, passenger) {
            if(!err) {
                callback(null, passenger);
            } else {
                callback(err, null);
            }
        });
    }
};

module.exports = Tokenizer;