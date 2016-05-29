var express = require('express');
var router = express.Router();
var seatValidator = require('./seatValidator');
var seatService = require('./seatServices');

router.route('/')
	.get(function(req, res) {
		seatService.getAllSeats(req, function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				console.log(err);
				res.json(err);
			}
		});
	}).put(function(req, res) {
	    	seatService.addNewSeat(req, function(err, result) {
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
			seatService.statusPush(req, function(err, result) {
				if(!err) {
					res.json(result);
				} else {
					console.log(err);
					res.json(err);
				}
			});
		} else {
			seatService.getSeatById(req.params.seat_id, function(err, result) {
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
  		seatService.updateSeat(req, function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				console.log(err);
				res.json(err);
			}
		});
  	})
  	.delete(function(req, res) {
		seatService.deleteSeat(req.params.seat_id, function(err, result) {
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