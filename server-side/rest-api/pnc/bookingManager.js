var BookingListView = require('./bookingListView');
var orderService = require('app_modules/crud-api').orders.services;

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
	}
};

module.exports = bookingManager;
