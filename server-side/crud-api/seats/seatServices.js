var Seat = require('./seatDao');
var seatConverter = require('./seatConverter');

var SeatService = {
	getAllSeats : function(callback) {
		Seat.find(function(err, results) {
			if(!err) {
				if(results) {
					callback(null, results);
				} else {
					callback({ message: "No seats found."}, null);
				}
			} else {
//				console.log("Error occured during retrieve of seats list: " + err);
				callback({ message: "Error occured during retrieve of seats list."}, null);
			}
		});//.populate('currentPassenger');
	},
	getSeatById : function(id, callback) {
		getSeatDaoById.call(this, id, function(err, result) {
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
			}, function(err, result) {
				if(!err) {
					if(result) {
						callback(null, seatConverter.daoToJson(result));
					} else {
						callback({ message: "No result found for position: " + position }, null);
					}
				} else {
					callback({ message: "Error occured during the seat retrieve.", error: err }, null);
				}
		}).populate('currentPassenger');
	},
	getSeatByFirstAndLastName : function(firstname, lastname, callback) {
		Seat.find({
			'currentPassenger.personnalInfos.firstname' : firstname,
			'currentPassenger.personnalInfos.lastname' : lastname,
		}, function(err, result) {
			if(!err) {
				if(result) {
					callback(null, result[0]);
				} else {
					callback({ message: "No result found for name: " + firstname + " " + lastname }, null);
				}
			} else {
				callback({ message: "Error occured during the seat retrieve.", error: err }, null);
			}
		}).populate('currentPassenger');	
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
//				console.log(err.stack);
				callback(err, null);
			}
		});
	},
	
	statusPush : function(req, callback) {
		getSeatDaoById.call(this, req.params.seat_id, function(err, result) {
			if(!err) {
				result.occuped = req.query.occuped;
				result.belted = req.query.belted;
				result.save(function(err, result) {
					if(!err) {
						callback(null, seatConverter.daoToJson(result));	
					} else {
						callback(err, null);
					}
				});
			} else {
				if(!err.error) {
					var toInsert = seatConverter.pushToDao(req);
					toInsert.save(function(err, result) {
					if(!err) {
						callback(null, seatConverter.daoToJson(toInsert));
					} else {
						callback(err, null);
					}
				});
				} else {
					
				}			
			}
		});
			
	},
	updateSeat : function(req, callback) {
//		var reqSeat = req;
		var seatId = req._id;
		if(req.body) {
//			reqSeat = req.body;
			seatId = req.params.seat_id;
		}
//		console.log("from update seat: " + JSON.stringify(req.body));
		getSeatDaoById.call(this, seatId, function(err, result) {
			if(!err) {
//				console.log("dao from update seat: " + result);
				seatConverter.mergeJsonIntoDao(result, req);
//				console.log("dao from update seat after merge: " + result);
				result.save(function(err, result) {
					if(!err) {
//						console.log("dao from after update: " + result);
						callback(null, seatConverter.daoToJson(result));	
					} else {
						callback(err, null);
					}
				});

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
	},
	deleteAll : function(callback) {
		Seat.remove({}, function(err, result) {
			if(!err) {
				callback(null, result);
			} else {
				callback(err, null);
			}
		});	
	},
	addAll : function(seats, callback) {
		Seat.create(seats, function(err, insertedSeats) {
			if(!err) {
				callback(null, insertedSeats);
			} else {
				callback(err, null);
			}
		});
	}
};

function getSeatDaoById(id, callback) {
	Seat.findById(id, function(err, result) {
		if(!err) {
			if(result) {
				callback(null, result);
			} else {
				callback({ message: "No result found for id: " + id }, null);
			}
		} else {
			callback({ message: "Error occured during the seat retrieve.", error: err }, null);
		}
	}).populate('currentPassenger');
}

module.exports = SeatService;