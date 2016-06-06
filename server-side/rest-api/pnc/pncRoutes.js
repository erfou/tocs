var express = require('express');
var router = express.Router();

var SeatMapManager = require('./seatMapManager');

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

module.exports = router;
