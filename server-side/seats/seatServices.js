var Seat = require('./seatDao');
var seatConverter = require('./seatConverter');

var SeatService = {
	getAllSeats : function(req, callback) {
		Seat.find(function(err, results) {
			if(!err) {
				if(results) {
					callback(null, seatConverter.daoListToJson(results));
				} else {
					callback({ message: "No seats found."}, null);
				}
			} else {
				console.log("Error occured during retrieve of seats list: " + err);
				callback({ message: "Error occured during retrieve of seats list."}, null);
			}
		});
	},
	getSeatById : function(id, callback) {
		Seat.findById(id, function(err, result) {
			if(!err) {
				if(result) {
					callback(null, seatConverter.daoToJson(result));
				} else {
					callback({ message: "No result found for id: " + id }, null);
				}
			} else {
				callback({ message: "Error occured during the seat retrieve.", error: err }, null);
			}
		});
	},
	getSeatByPosition : function(position, callback) {
		Seat.find({ 
			'position.column': position.column,
			'position.row': position.row
			}
			, function(err, result) {
				if(!err) {
					if(result) {
						callback(null, seatConverter.daoToJson(result));
					} else {
						callback({ message: "No result found for position: " + position }, null);
					}
				} else {
					callback({ message: "Error occured during the seat retrieve.", error: err }, null);
				}
		});
	},
	addNewSeat : function(req, callback) {
		var seatDao = seatConverter.jsonToDao(req);
		seatDao.save(function(err, result) {
			if(!err) {
				if(result) {
					callback(null, seatConverter.daoToJson(result));	
				} else {
					callback({ message: "error saving: " + req + " result doesn't exist: " + result}, null);
				}
			} else {
				console.log(err.stack);
				callback(err, null);
			}
		});
	},
	updateSeat : function(req, callback) {
		Seat.findById(req.params.seat_id, function(err, result) {
			if(!err) {
				if(result) {
					if(req.query.occuped) {
						result.occuped = req.query.occuped;
					} else {
						seatConverter.mergeJsonIntoDao(result, req);
					}
					result.save(function(err, result) {
						if(!err) {
							callback(null, seatConverter.daoToJson(result));	
						} else {
							callback(err, null);
						}
					});
					
				} else {
					callback({ message : "No result found for id: " + req.params.seat_id});
				}
			} else {
				callback(err, null);
			}
		});

	},
	deleteSeat : function(id, callback) {
		Seat.findByIdAndRemove(id, function(err, result) {
			if(!err) {
				callback(null, result);
			} else {
				callback(err, null);
			}
		});
	}

};

module.exports = SeatService;