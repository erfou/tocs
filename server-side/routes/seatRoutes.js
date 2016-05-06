var express = require('express');
var router = express.Router();
var seatValidator = require('../validators/seatValidator');
var seatService = require('../services/seatService');

router.route('/')
	.get(function(req, res) {
		seatService.getAllSeats(req,res);
	});
router.route('/seat')
    .post(function(req, res) {
		var validation = seatValidator(req);
		if(validation.valid) {
	    	seatService.addNewSeat(req,res);
		} else {
			res.json(validation);
		}
  	});
router.route('/seat/:seat_id')
  	.get(function(req,res) {
  		console.log("from route");
		seatService.getSeatById(req, res);
  	})
  	.put(function(req, res) {
  		console.log("from: /seat/:seat_id");
  		seatService.updateSeatStatus(req, res);
  	});
// more routes for our API will happen here
module.exports = router;