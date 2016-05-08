var express = require('express');
var router = express.Router();
var itemService = require('../services/itemService');

router.route('/')
	.get(function(req, res) {
		itemService.getAllItems(req, res);
	}).post(function(req, res) {
		itemService.addNewItem(req, res);
  	});

router.route('/:item_id')
    .get(function(req, res) {
		itemService.getItemById(req, res);
  	})
  	.put(function(req, res) {
		itemService.updateItem(req, res);
  	})
  	.delete(function(req, res) {
		itemService.deleteItem(req, res);
  	});
// more routes for our API will happen here
module.exports = router;