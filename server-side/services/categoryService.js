var Category = require('../models/categoryDao');
var categoryConverter = require('../converters/categoryConverter');
var CategoryService = {
	getAllCategories : function(req, res) {
		Category.find(function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				console.log("Error occured during retrieve of seats list: " + err);
				res.json({ message: "Error occured during retrieve of seats list."})
			}
		})
	},
	addNewCategory : function(req, res) {
		var categoryDao = categoryConverter.jsonToDao(req);
		categoryDao.save(function(err, result) {
			if(!err) {
				res.json(categoryConverter.daoToJson(result));	
			} else {
				console.log(err.stack);
				res.json(err)
			}
		});
	},
	updateCategory : function(req, res) {
		Category.findById(req.params.category_id, function(err, result) {
			if(!err) {
				if(result) {
					categoryConverter.mergeJsonIntoDao(result, req);
					result.save(function(err, result) {
						if(!err) {
							res.json(categoryConverter.daoToJson(result));	
						} else {
							res.json(err);
						}
					});
					
				} else {
					res.json({ message: "No result found for id: " + req.params.category_id});
				}
			} else {
				res.json(err);
			}
		})

	},
	getCategoryById : function(req, res) {
		Category.findById(req.params.category_id, function(err, result) {
			if(!err) {
				res.json(categoryConverter.daoToJson(result));
			} else {
				res.json({ message: "Error occured during the seat retrieve.", error: err })
			}
		})
	},
	deleteCategory : function(req, res) {
		Category.findByIdAndRemove(req.params.category_id, function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				res.json(err);
			}
		})
	}
}

module.exports = CategoryService;