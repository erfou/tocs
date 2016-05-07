var express = require('express');
var router = express.Router();
var seatValidator = require('../validators/seatValidator');
var seatService = require('../services/seatService');

router.route('/')
	.get(function(req, res) {
		seatService.getAllSeats(req,res);
	}).post(function(req, res) {
		var validation = seatValidator(req);
		if(validation.valid) {
	    	seatService.addNewSeat(req,res);
		} else {
			res.json(validation);
		}
  	});
router.route('/:seat_id')
  	.get(function(req,res) {
		seatService.getSeatById(req, res);
  	})
  	.put(function(req, res) {
  		seatService.updateSeat(req, res);
  	})
  	.delete(function(req, res) {
		seatService.deleteSeat(req, res);
  	});
// more routes for our API will happen here
module.exports = router;