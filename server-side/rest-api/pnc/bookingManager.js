var async = require('async');
var BookingListView = require('./bookingListView');
var orderService = require('app_modules/crud-api').orders.services;
var ledsManager = require('app_modules/ledsManager');

var bookingManager = {
	getAll: function(callback) {
		orderService.getAllOrdersFullPopulated(function(err, orders) {
			if(!err) {
				if(orders && orders.length > 0) {
					callback(null, new BookingListView(orders));
				} else {
					callback({ message: "Aucunes commandes trouvées." }, null);
				}
			} else {
				callback(err, null);
			}
		});
	},

	getByPassenger: function(passengerId, callback) {
		orderService.getOrdersByPassengerFullPopulated(passengerId, function(err, orders) {
			if(!err) {
				if(orders && orders.length > 0) {
					callback(null, new BookingListView(orders));
				} else {
					callback({ message: "Ce passager n'a pas de commandes." }, null);
				}
			} else {
				callback(err, null);
			}
		});
	},

	manageBooking: function(action, bookingId, callback) {
		async.waterfall([
			function(callback) {
				orderService.getOrderById(bookingId, function(err, order) {
					if(!err) {
						callback(null, order);
					} else {
						callback(err, null);
					}
				});
			},
			function(order, callback) {
				if(action == "validate") {
					order.validated = true;
					order.cancelled = false;
				} else if(action == "cancel"){
					order.cancelled = true;
					order.validated = false;
				}
				orderAsReq = {
					body: order
				};
				orderService.updateOrder(orderAsReq, function(err, order) {
					if(!err) {
/*
						order.populate('passenger', function(err, popResult) {
							if(!err) {
								var color = action == "validate" ? "G" : "A"
								ledsManager.lightIt(popResult.passenger.seat, color);
							}
						});						
*/
						callback(null, order);
					} else {
						callback(err, null);
					}
				});
			}
		], function(err, result) {
			if(!err) {
				callback(null, result);
			} else {
				callback(err, null);
			}
		});
	}
};

module.exports = bookingManager;
