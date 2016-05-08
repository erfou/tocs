var express = require('express');
var router = express.Router();
var loginManager = require('../managers/loginManager');

router.route('/login')
	.post(function(req, res) {
		loginManager.login(req, function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				res.json(err);
			}
		});
  	});

module.exports = router;