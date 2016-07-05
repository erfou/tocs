var express = require('express');
var router = express.Router();

var ledsManager = require('app_modules/ledsManager');
var SeatManager = require('./seatManager');
var SeatMapManager = require('./seatMapManager');
var PassengerManager = require('./passengerManager');
var BookingManager = require('./bookingManager');

router.route('/seat-map/:view_type')
	.get(function(req, res) {
		SeatMapManager.seatMap(req.params.view_type, function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				res.json(err);
			}
		});
  	})
	.put(function(req, res) {
		ledsManager.setTypeOfView(req.params.view_type);
		res.json({ message : "type of view changed"});
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

router.route('/bookings/')
	.get(function(req, res) {
		BookingManager.getAll(function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				res.json(err);
			}
		});
	});

router.route('/cancel/bookings/:order_id')
	.get(function(req, res) {
		BookingManager.manageBooking("cancel", req.params.order_id, function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				res.json(err);
			}
		});
	});

router.route('/validate/bookings/:order_id')
	.get(function(req, res) {
		console.log("/validate/bookings/" + req.params.order_id);
		BookingManager.manageBooking("validate", req.params.order_id, function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				res.json(err);
			}
		});
	});

router.route('/bookings/:passenger_id')
	.get(function(req, res) {
		BookingManager.getByPassenger(req.params.passenger_id, function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				res.json(err);
			}
		});
	});

module.exports = router;
