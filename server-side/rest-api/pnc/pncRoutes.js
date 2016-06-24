var express = require('express');
var router = express.Router();

var SeatManager = require('./seatManager');
var SeatMapManager = require('./seatMapManager');
var PassengerManager = require('./passengerManager');

router.route('/seat-map/:view_type')
	.get(function(req, res) {
		SeatMapManager.seatMap(req, req.params.view_type, function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				res.json(err);
			}
		});
  	});

router.route('/passengers/:passenger_id')
	.get(function(req, res) {
		PassengerManager.getById(req, function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				res.json(err);
			}
		});
	});

router.route('/passengers/')
	.get(function(req, res) {
		PassengerManager.getAll(function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				res.json(err);
			}
		});
	});

router.route('/seats/')
	.get(function(req, res) {
		SeatManager.getAll(function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				res.json(err);
			}
		});
	});

router.route('/seats/:seat_id')
	.get(function(req, res) {
		SeatManager.getById(req, function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				res.json(err);
			}
		});
	});

module.exports = router;
