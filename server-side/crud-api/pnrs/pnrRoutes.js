var express = require('express');
var router = express.Router();
var PnrService = require('./pnrServices');

router.route('/')
	.get(function(req, res) {
		PnrService.getAllPnrs(function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				console.log(err);
				res.json(err);
			}
		});
	}).put(function(req, res) {
		PnrService.addNewPnr(req, function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				console.log(err);
				res.json(err);
			}
		});
  	});

router.route('/:record_locator')
    .get(function(req, res) {
		PnrService.getPnrById(req.params.record_locator, function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				console.log(err);
				res.json(err);
			}
		});
  	})
  	.post(function(req, res) {
  		console.log("req from pnr routes: " + req);
		PnrService.updatePnr(req, function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				console.log(err);
				res.json(err);
			}
		});
  	})
  	.delete(function(req, res) {
		PnrService.deletePnr(req.params.record_locator, function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				console.log(err);
				res.json(err);
			}
		});
  	});
// more routes for our API will happen here
module.exports = router;