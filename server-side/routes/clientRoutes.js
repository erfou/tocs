var express = require('express');
var router = express.Router();
var loginManager = require('../managers/loginManager');
var homeManager = require('../managers/homeManager');

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

router.route('/home/:seat_id')
	.get(function(req, res) {
		homeManager.load(req, function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				res.json(err);
			}
		});
  	});

module.exports = router;