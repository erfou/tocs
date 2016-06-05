var express = require('express');
var router = express.Router();

var SeatMapManager = require('./seatMapManager');

router.route('/service')
	.get(function(req, res) {
		SeatMapManager.seatMap(req, "service", function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				res.json(err);
			}
		});
  	});

module.exports = router;
