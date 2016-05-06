var Seat = require('../models/seatDao');
var seatConverter = require('../converters/SeatConverter');
var SeatService = {
	getAllSeat : function(req, res) {
		Seat.find(function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				console.log("Error occured during retrieve of seats list: " + err);
				res.json({ message: "Error occured during retrieve of seats list."})
			}
		})
	},
	addNewSeat : function(req, res){
		var seatDao = seatConverter.jsonToDao(req);
		seatDao.save(function(err, result) {
			if(!err) {
				res.json(result);	
			} else {
				res.json(err)
			}
		});
	},
	updateSeatStatus : function(req, res){
		console.log("updateSeatStatus from service");
	}
}

module.exports = SeatService;