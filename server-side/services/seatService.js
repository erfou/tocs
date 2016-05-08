var Seat = require('../models/seatDao');
var seatConverter = require('../converters/seatConverter');
var SeatService = {
	getAllSeats : function(req, callback) {
		Seat.find(function(err, result) {
			if(!err) {
				callback(result);
			} else {
				console.log("Error occured during retrieve of seats list: " + err);
				callback({ message: "Error occured during retrieve of seats list."});
			}
		});
	},
	addNewSeat : function(req, callback) {
		var seatDao = seatConverter.jsonToDao(req);
		seatDao.save(function(err, result) {
			if(!err) {
				callback(seatConverter.daoToJson(result));	
			} else {
				console.log(err.stack);
				callback(err);
			}
		});
	},
	updateSeat : function(req, callback) {
		Seat.findById(req.params.seat_id, function(err, result) {
			if(!err) {
				if(result) {
					seatConverter.mergeJsonIntoDao(result, req);
					result.save(function(err, result) {
						if(!err) {
							callback(seatConverter.daoToJson(result));	
						} else {
							callback(err);
						}
					});
					
				} else {
					callback({ message : "No result found for id: " + req.params.seat_id});
				}
			} else {
				callback(err);
			}
		});

	},
	getSeatById : function(req, callback) {
		Seat.findById(req.params.seat_id, function(err, result) {
			if(!err) {
				callback(seatConverter.daoToJson(result));
			} else {
				callback({ message: "Error occured during the seat retrieve.", error: err });
			}
		});
	},
	deleteSeat : function(req, callback) {
		Seat.findByIdAndRemove(req.params.seat_id, function(err, result) {
			if(!err) {
				callback(result);
			} else {
				callback(err);
			}
		});
	}

};

module.exports = SeatService;