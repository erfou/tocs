var Product = require('./productDao');
var productConverter = require('./productConverter');
var ProductService = {
	getAllProducts : function(callback) {
		Product.find(function(err, results) {
			if(!err) {
				callback(null, productConverter.daoListToJson(results));
			} else {
				console.log("Error occured during retrieve of products list: " + err);
				callback({ message: "Error occured during retrieve of products list."}), null;
			}
		});
	},
	getByCategoryProducts : function(categoryId, callback) {
		Product.find({'categoryId' : categoryId},function(err, results) {
			if(!err) {
				callback(null, productConverter.daoListToJson(results));
			} else {
				console.log("Error occured during retrieve of products list: " + err);
				callback({ message: "Error occured during retrieve of products list."}), null;
			}
		});
	},
	addNewProduct : function(req, callback) {
		var productDao = productConverter.jsonToDao(req);
		productDao.save(function(err, result) {
			if(!err) {
				callback(null, productConverter.daoToJson(result));	
			} else {
				console.log(err.stack);
				callback(err, null);
			}
		});
	},
	updateProduct : function(req, callback) {
		Product.findById(req.params.product_id, function(err, result) {
			if(!err) {
				if(result) {
					productConverter.mergeJsonIntoDao(result, req);
					result.save(function(err, result) {
						if(!err) {
							callback(null, productConverter.daoToJson(result));	
						} else {
							callback(err, null);
						}
					});
					
				} else {
					callback({ message : "No result found for id: " + req.params.product_id}, null);
				}
			} else {
				callback(err, null);
			}
		});

	},
	getProductById : function(req, callback) {
		Product.findById(req.params.product_id, function(err, result) {
			if(!err) {
				callback(null, productConverter.daoToJson(result));
			} else {
				callback({ message: "Error occured during the product retrieve.", error: err }, null);
			}
		});
	},
	deleteProduct : function(req, callback) {
		Product.findByIdAndRemove(req.params.product_id, function(err, result) {
			if(!err) {
				callback(null, result);
			} else {
				callback(err, null);
			}
		});
	},
	deleteAll : function(callback) {
		Product.remove({}, function(err, result) {
			if(!err) {
				callback(null, result);
			} else {
				callback(err, null);
			}
		});	
	},
	addAll : function(products, callback) {
		Product.create(products, function(err, insertedProducts) {
			if(!err) {
				callback(null, insertedProducts);
			} else {
				callback(err, null);
			}
		});
	}

};

module.exports = ProductService;