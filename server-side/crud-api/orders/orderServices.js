var Order = require('./orderDao');
var orderConverter = require('./orderConverter');
var OrderService = {
	getAllOrders : function(callback) {
		Order.find(function(err, results) {
			if(!err) {
				callback(null, results);
			} else {
				console.log("Error occured during retrieve of orders list: " + err);
				callback({ message: "Error occured during retrieve of orders list."}), null;
			}
		}).populate('product');
	},
	getOrdersByCategory : function(category, callback) {
		Order.find({'category' : category},function(err, results) {
			if(!err) {
				callback(null, results);
				//callback(null, orderConverter.daoListToJson(results));
			} else {
				console.log("Error occured during retrieve of orders list: " + err);
				callback({ message: "Error occured during retrieve of orders list."}), null;
			}
		});
	},
	addNewOrder : function(req, callback) {
		var orderDao = orderConverter.jsonToDao(req);
		orderDao.save(function(err, result) {
			if(!err) {
				console.log("=====>>>> orderDao: " + orderDao);
				callback(null, result);	
			} else {
				console.log(err.stack);
				callback(err, null);
			}
		});
	},
	updateOrder : function(req, callback) {
		Order.findOne({ _id: req.params.order_id }, function(err, result) {
			if(!err) {
				if(result) {
					orderConverter.mergeJsonIntoDao(result, req);
					result.save(function(err, result) {
						if(!err) {
							callback(null, result);	
						} else {
							callback(err, null);
						}
					});
					
				} else {
					console.log("No result found for id: " + req.params.order_id);
					callback({ message : "No result found for id: " + req.params.order_id}, null);
				}
			} else {
				callback(err, null);
			}
		});

	},
	getOrderById : function(req, callback) {
			console.log("result from getOrderById");
		Order.findById(req.params.order_id, function(err, result) {
			console.log("result from getOrderById: " + JSON.stringify(result));
			if(!err) {
				callback(null, result);
			} else {
				callback({ message: "Error occured during the order retrieve.", error: err }, null);
			}
		});
	},
	deleteOrder : function(req, callback) {
		Order.findByIdAndRemove(req.params.order_id, function(err, result) {
			if(!err) {
				callback(null, result);
			} else {
				callback(err, null);
			}
		});
	},
	deleteAll : function(callback) {
		Order.remove({}, function(err, result) {
			if(!err) {
				callback(null, result);
			} else {
				callback(err, null);
			}
		});	
	},
	addAll : function(orders, callback) {
		Order.create(orders, function(err, insertedOrders) {
			if(!err) {
				callback(null, insertedOrders);
			} else {
				callback(err, null);
			}
		});
	}

};

module.exports = OrderService;