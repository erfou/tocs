var express = require('express');
var router = express.Router();
var categoryService = require('../services/categoryService');

router.route('/')
	.get(function(req, res) {
		categoryService.getAllCategories(req, res);
	}).post(function(req, res) {
		categoryService.addNewCategory(req, res);
  	});

router.route('/:category_id')
    .get(function(req, res) {
		categoryService.getCategoryById(req, res);
  	})
  	.put(function(req, res) {
		categoryService.updateCategory(req, res);
  	})
  	.delete(function(req, res) {
		categoryService.deleteCategory(req, res);
  	});
// more routes for our API will happen here
module.exports = router;