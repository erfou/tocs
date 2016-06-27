var orderService = require('app_modules/crud-api').orders.services;

var bookingManager = {
	getAll: function(callback) {
		orderService.getAllOrders(function(err, orders) {
			if(!err) {
				var mapOfOrders = new Map();
				if(orders && orders.length > 0) {
					for(var order of orders) {
						console.log("order: " + order);
						console.log("mapOfOrders.get(order._id): " + mapOfOrders.get(order._id));
						if(mapOfOrders.get(order._id)) {
							mapOfOrders.get(order._id).quantity++;
						} else {
							console.log("order inserting in map: " + order._id + ": " + order);
							mapOfOrders.set(order._id, JSON.parse(JSON.stringify(order)));
							mapOfOrders.set("tamere", "lapute");
							console.log("mapOfOrders after insert order: " + JSON.stringify(mapOfOrders));
						}
					}
					console.log("mapOfOrders: " + JSON.stringify(mapOfOrders));
					callback(null, mapOfOrders.values());
				} else {
					callback({ message: "Aucunes commandes trouvées." }, null);
				}
			} else {
				callback(err, null);
			}
		});
	},

	getByPassenger: function(passengerId, callback) {
		orderService.getOrdersByPassenger(passengerId, function(err, orders) {
			if(!err) {
				if(orders && orders.length > 0) {
					callback(null, orders);
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
