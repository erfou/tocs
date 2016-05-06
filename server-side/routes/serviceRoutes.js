var express = require('express');
var router = express.Router();
//var seatValidator = require('../validators/seatValidator');
//var seatService = require('../services/seatService');

router.route('/load')
	.get(function(req, res) {
	    res.json(require('../tests/services/mocks/loadServicesRes'));
		//seatService.getAllSeat(req,res);
	});
router.route('/create')
    .post(function(req, res) {
//		var validation = seatValidator(req);
//		if(validation.valid) {
//	    	seatService.addNewSeat(req,res);
//		} else {
			res.json({message: "created !"});
//		}
  	});
// more routes for our API will happen here
module.exports = router;