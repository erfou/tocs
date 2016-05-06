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
				res.json(result);	
			} else {
				res.json(err)
			}
		});
	},
	updateSeatStatus : function(req, res) {
		Seat.findById(req.params.seat_id, function(err, result) {
			if(!err) {
				if(result) {
					result.occuped = req.body.occuped;
					result.position = req.body.position;
					//var seatDao = seatConverter.jsonToDao(req);
					//seatDao._id = result._id;
					result.save(function(err, result) {
						if(!err) {
							res.json(result);	
						} else {
							res.json(err);
						}
					});
					
				} else {
					res.json("result of findById: " + result);
				}
			} else {
				res.json(err);
			}
		})

	},
	getSeatById : function(req, res) {
		Seat.findById(req.params.seat_id, function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				res.json({ message: "Error occured during the seat retrieve.", error: err })
			}
		})
	}
}

module.exports = SeatService;