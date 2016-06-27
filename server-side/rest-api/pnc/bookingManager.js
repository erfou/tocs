var orderService = require('app_modules/crud-api').orders.services;

var bookingManager = {
	getAll: function(callback) {
		orderService.getAllOrders(function(err, result) {
			if(!err) {
				if(result) {
					callback(null, result);
				} else {
					callback({ message: "Aucunes commandes trouvées." }, null);
				}
			} else {
				callback(err, null);
			}
		});
	},

	getByPassenger: function(passengerId, callback) {
		orderService.getOrdersByPassenger(passengerId, function(err, result) {
			if(!err) {
				if(result) {
					callback(null, result)
				} else {
					callback({ message: "Ce passager n'a pas de commandes." }, null);
				}
			} else {
				callback(err, null);
			}
		});
	}
}