var Category = require('./categoryDao');
var categoryConverter = require('./categoryConverter');
var CategoryService = {
	getAllCategories : function(callback) {
		Category.find(function(err, results) {
			if(!err) {
				callback(null, categoryConverter.daoListToJson(results));
			} else {
				console.log("Error occured during retrieve of seats list: " + err);
				callback({ message: "Error occured during retrieve of seats list."}, null);
			}
		});
	},
	getCategoriesByFareClass : function(fareClass, callback) {
		Category.find({
			compatibleClasses : fareClass
		}).exec(function(err, results) {
			if(!err) {
				callback(null, categoryConverter.daoListToJson(results));
			} else {
				console.log("Error occured during retrieve of seats list: " + err);
				callback({ message: "Error occured during retrieve of seats list."}, null);
			}
		});
	},
	addNewCategory : function(req, callback) {
		var categoryDao = categoryConverter.jsonToDao(req);
		categoryDao.save(function(err, result) {
			if(!err) {
				callback(categoryConverter.daoToJson(result), null);	
			} else {
				console.log(err.stack);
				callback(err, null);
			}
		});
	},
	updateCategory : function(req, callback) {
		Category.findById(req.params.category_id, function(err, result) {
			if(!err) {
				if(result) {
					categoryConverter.mergeJsonIntoDao(result, req);
					result.save(function(err, result) {
						if(!err) {
							callback(null, categoryConverter.daoToJson(result));	
						} else {
							callback(err, null);
						}
					});
					
				} else {
					callback({ message: "No result found for id: " + req.params.category_id}, null);
				}
			} else {
				callback(err, null);
			}
		});

	},
	getCategoryById : function(id, callback) {
		Category.findById(id, function(err, result) {
			if(!err) {
				callback(null, categoryConverter.daoToJson(result));
			} else {
				callback({ message: "Error occured during the seat retrieve.", error: err }, null);
			}
		});
	},
	deleteCategory : function(req, callback) {
		Category.findByIdAndRemove(req.params.category_id, function(err, result) {
			if(!err) {
				callback(null, result);
			} else {
				callback(err, null);
			}
		});
	},
	deleteAll : function(callback) {
		Category.remove({}, function(err, result) {
			if(!err) {
				callback(null, result);
			} else {
				callback(err, null);
			}
		});	
	},
	addAll : function(categories, callback) {
		Category.create(categories, function(err, insertedCategories) {
			if(!err) {
				callback(null, insertedCategories);
			} else {
				callback(err, null);
			}
		});
	}
};

module.exports = CategoryService;