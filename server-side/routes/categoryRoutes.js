var express = require('express');
var router = express.Router();
var categoryService = require('../services/categoryService');

router.route('/')
	.get(function(req, res) {
		categoryService.getAllCategories(req, function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				console.log(err);
				res.json(err);
			}
		});
	}).post(function(req, res) {
		categoryService.addNewCategory(req, function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				console.log(err);
				res.json(err);
			}
		});
  	});

router.route('/:category_id')
    .get(function(req, res) {
		categoryService.getCategoryById(req, function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				console.log(err);
				res.json(err);
			}
		});
  	})
  	.put(function(req, res) {
		categoryService.updateCategory(req, function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				console.log(err);
				res.json(err);
			}
		});
  	})
  	.delete(function(req, res) {
		categoryService.deleteCategory(req, function(err, result) {
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