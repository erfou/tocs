var Seat = require('../models/seatDao');
var seatConverter = require('../converters/seatConverter');
var SeatService = {
	getAllSeats : function(req, res) {
		Seat.find(function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				console.log("Error occured during retrieve of seats list: " + err);
				res.json({ message: "Error occured during retrieve of seats list."})
			}
		})
	},
	addNewSeat : function(req, res) {
		var seatDao = seatConverter.jsonToDao(req);
		seatDao.save(function(err, result) {
			if(!err) {
				res.json(seatConverter.daoToJson(result));	
			} else {
				console.log(err.stack);
				res.json(err)
			}
		});
	},
	updateSeat : function(req, res) {
		Seat.findById(req.params.seat_id, function(err, result) {
			if(!err) {
				if(result) {
					seatConverter.mergeJsonIntoDao(result, req);
					result.save(function(err, result) {
						if(!err) {
							res.json(seatConverter.daoToJson(result));	
						} else {
							res.json(err);
						}
					});
					
				} else {
					res.json({ message : "No result found for id: " + req.params.seat_id});
				}
			} else {
				res.json(err);
			}
		})

	},
	getSeatById : function(req, res) {
		Seat.findById(req.params.seat_id, function(err, result) {
			if(!err) {
				res.json(seatConverter.daoToJson(result));
			} else {
				res.json({ message: "Error occured during the seat retrieve.", error: err })
			}
		})
	},
	deleteSeat : function(req, res) {
		Seat.findByIdAndRemove(req.params.seat_id, function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				res.json(err);
			}
		})
	}

}

module.exports = SeatService;