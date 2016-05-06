var express = require('express');
var router = express.Router();
var seatValidator = require('../validators/seatValidator');
var seatService = require('../services/seatService');

router.route('/')
	.get(function(req, res) {
		seatService.getAllSeat(req,res);
	});
router.route('/seat')
    .post(function(req, res) {
		var validation = seatValidator(req);
		if(validation.valid) {
	    	seatService.addNewSeat(req,res);
		} else {
			res.json(validation);
		}
  	})
  	.get(function(req,res) {

  	});
// more routes for our API will happen here
module.exports = router;