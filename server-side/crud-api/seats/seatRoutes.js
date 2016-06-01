var express = require('express');
var router = express.Router();
var SeatService = require('./seatServices');

router.route('/')
	.get(function(req, res) {
		SeatService.getAllSeats(function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				console.log(err);
				res.json(err);
			}
		});
	}).put(function(req, res) {
	    	SeatService.addNewSeat(req, function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				console.log(err);
				res.json(err);
			}
		});
  	});
router.route('/:seat_id')
	.get(function(req, res) {
		if(req.query.occuped) {
			SeatService.statusPush(req, function(err, result) {
				if(!err) {
					res.json(result);
				} else {
					console.log(err);
					res.json(err);
				}
			});
		} else {
			SeatService.getSeatById(req.params.seat_id, function(err, result) {
				if(!err) {
					res.json(result);
				} else {
					console.log(err);
					res.json(err);
				}
			});
		}
  	})
  	.post(function(req, res) {
  		SeatService.updateSeat(req, function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				console.log(err);
				res.json(err);
			}
		});
  	})
  	.delete(function(req, res) {
		SeatService.deleteSeat(req.params.seat_id, function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				console.log(err);
				res.json(err);
			}
		});
  	});
// more routes for our API will happen here
module.exports = router;