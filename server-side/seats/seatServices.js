var Seat = require('./seatDao');
var seatConverter = require('./seatConverter');

var SeatService = {
	getAllSeats : function(req, callback) {
		Seat.find(function(err, results) {
			if(!err) {
				if(results) {
					callback(seatConverter.daoListToJson(results));
				} else {
					callback({ message: "No seats found."});
				}
			} else {
				console.log("Error occured during retrieve of seats list: " + err);
				callback({ message: "Error occured during retrieve of seats list."});
			}
		});
	},
	getSeatById : function(id, callback) {
		Seat.findById(id, function(err, result) {
			if(!err) {
				if(result) {
					console.log("from service result: " + result);
					console.log("from service result._id: " + result._id);
					callback(seatConverter.daoToJson(result));
				} else {
					callback({ message: "No result found for id: " + id })
				}
			} else {
				callback({ message: "Error occured during the seat retrieve.", error: err });
			}
		});
	},
	getSeatByPosition : function(position, callback) {
		console.log(position);
		Seat.find({ 
			'position.column': position.column,
			'position.row': position.row
			}
			, function(err, result) {
				console.log("err from service: " + err);
				console.log("result from service: " + result);
				if(!err) {
					if(result) {
						console.log("from service result: " + result);
						console.log("from service result._id: " + result._id);
						callback(seatConverter.daoToJson(result));
					} else {
						callback({ message: "No result found for position: " + position });
					}
				} else {
					callback({ message: "Error occured during the seat retrieve.", error: err });
				}
		});
	},
	addNewSeat : function(req, callback) {
		var seatDao = seatConverter.jsonToDao(req);
		seatDao.save(function(err, result) {
			if(!err) {
				if(result) {
					callback(seatConverter.daoToJson(result));	
				} else {
					callback({ message: "error saving: " + req + " result doesn't exist: " + result});
				}
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
	deleteSeat : function(id, callback) {
		Seat.findByIdAndRemove(id, function(err, result) {
			if(!err) {
				callback(result);
			} else {
				callback(err);
			}
		});
	}

};

module.exports = SeatService;