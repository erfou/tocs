var express = require('express');
var router = express.Router();
var loginManager = require('./loginManager');
var homeManager = require('./homeManager');

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

router.route('/home')
	.post(function(req, res) {
		homeManager.load(req, function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				res.json(err);
			}
		});
  	});

module.exports = router;
