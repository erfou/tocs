var Order = require('./orderDao');
var orderConverter = require('./orderConverter');
var customEventEmitter = require('app_modules/customEventEmitter');
var ledsManager = require('app_modules/ledsManager');
var BookingListView = require('../../rest-api/pnc/BookingListView');


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
	getAllOrdersFullPopulated : function(callback) {
		getOrdersFullPopulated.call(this, function(err, results) {
			if(!err) {
				callback(null, results);
			} else {
				console.log("Error occured during retrieve of orders list: " + err);
				callback({ message: "Error occured during retrieve of orders list."}), null;
			}
		});
	},
	getOrdersByPassengerFullPopulated : function(passengerId, callback) {
		Order.find({'fromPNR': false, 'passenger' : passengerId},function(err, results) {
			if(!err) {
				callback(null, results);
				//callback(null, orderConverter.daoListToJson(results));
			} else {
				console.log("Error occured during retrieve of orders list: " + err);
				callback({ message: "Error occured during retrieve of orders list."}), null;
			}
		}).populate('product passenger');
	},
	getOrdersByPassenger : function(passengerId, callback) {
		Order.find({'passenger' : passengerId},function(err, results) {
			if(!err) {
				callback(null, results);
				//callback(null, orderConverter.daoListToJson(results));
			} else {
				console.log("Error occured during retrieve of orders list: " + err);
				callback({ message: "Error occured during retrieve of orders list."}), null;
			}
		}).populate('product');
	},
	addNewOrder : function(req, callback) {
		var orderDao = orderConverter.jsonToDao(req);
		orderDao.save(function(err, order) {
			if(!err) {
				getOrdersFullPopulated.call(this, function(err, orders) {
					if(!err) {
						var restBookingListView = new BookingListView(orders);
						customEventEmitter.emit("updateBookings", restBookingListView.bookingListView);
					} else {
						console.log(err);
					}
				});
				order.populate('passenger', function(err, popResult) {
					if(!err) {
						ledsManager.lightIt(popResult.passenger.seat, "B");
					}
				});
				callback(null, order);	
			} else {
				console.log(err.stack);
				callback(err, null);
			}
		});
	},
	updateOrder : function(req, callback) {
		var id = req._id;
		if(req.body) {
			id = req.body._id;
			req.body.fromPNR = false;
		}
		if(req.params) {
			id = req.params.order_id;
		}

		Order.findOne({ _id: id }, function(err, result) {
			if(!err) {
				if(result) {
					orderConverter.mergeJsonIntoDao(result, req);
					result.save(function(err, result) {
						if(!err) {
							getOrdersFullPopulated.call(this, function(err, orders) {
								if(!err) {
									var restBookingListView = new BookingListView(orders);
									customEventEmitter.emit("updateBookings", restBookingListView.bookingListView);
								} else {
									console.log(err);
								}
							});
							callback(null, result);	
						} else {
							callback(err, null);
						}
					});
					
				} else {
					console.log("No result found for id: " + id);
					callback({ message : "No result found for id: " + id}, null);
				}
			} else {
				callback(err, null);
			}
		});

	},
	getOrderById : function(id, callback) {
		Order.findById(id, function(err, result) {
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

function getOrdersFullPopulated(callback) {
	Order.find({'fromPNR': false},function(err, results) {
		if(!err) {
			callback(null, results);
		} else {
			console.log("Error occured during retrieve of orders list: " + err);
			callback({ message: "Error occured during retrieve of orders list."}), null;
		}
	}).populate('product passenger');
}

module.exports = OrderService;