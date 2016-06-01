var express = require('express');
var router = express.Router();
var ItemService = require('./itemServices');

router.route('/')
	.get(function(req, res) {
		ItemService.getAllItems(function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				console.log(err);
				res.json(err);
			}
		});
	}).put(function(req, res) {
		ItemService.addNewItem(req, function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				console.log(err);
				res.json(err);
			}
		});
  	});

router.route('/:item_id')
    .get(function(req, res) {
		ItemService.getItemById(req, function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				console.log(err);
				res.json(err);
			}
		});
  	})
  	.post(function(req, res) {
		ItemService.updateItem(req, function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				console.log(err);
				res.json(err);
			}
		});
  	})
  	.delete(function(req, res) {
		ItemService.deleteItem(req, function(err, result) {
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