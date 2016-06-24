var SeatListView = require('./seatListView');
var SeatInfosView = require('./seatInfosView');
var seatService = require('app_modules/crud-api').seats.services;

var seatListView = new SeatListView();

var seatManager = {
    getAll: function(callback) {
        seatService.getAllSeats(function(err, results) {
           if(!err)  {
               if(results) {
                   for(var seat of results) {
                       seatListView.seatInfosView.push(new SeatInfosView(seat));
                   }
                   callback(null, seatListView);
               } else {
                   callback({ error: "retrieve seats failed"}, null);
               }
           } else {
               callback(err, null);
           }
        });
    },
    getById: function(req, callback) {
        seatService.getSeatById(req.params.seat_id, function(err, result) {
           if(!err) {
               if(result) {
                   seatListView.seatInfosView.push(new SeatInfosView(result));
                   callback(null, seatListView);
               } else {
                   callback({ error: "No seat found for id: " + req.params.seat_id }, null);
               }
           } else {
                callback(err, null);
           }
        });
    }
};

module.exports = seatManager;