var Passenger = require('./passengerDao');
var passengerConverter = require('./passengerConverter');
var PassengerService = {
	getAllPassengers : function(callback) {
		Passenger.find(function(err, results) {
			if(!err) {
				callback(null, results);
			} else {
				console.log("Error occured during retrieve of passengers list: " + err);
				callback({ message: "Error occured during retrieve of passengers list."}), null;
			}
		});
	},
	getPassengersByCategory : function(category, callback) {
		Passenger.find({'category' : category},function(err, results) {
			if(!err) {
				callback(null, results);
				//callback(null, passengerConverter.daoListToJson(results));
			} else {
				console.log("Error occured during retrieve of passengers list: " + err);
				callback({ message: "Error occured during retrieve of passengers list."}), null;
			}
		});
	},
	addNewPassenger : function(req, callback) {
		var passengerDao = passengerConverter.jsonToDao(req);
		passengerDao.save(function(err, result) {
			if(!err) {
				callback(null, result);	
			} else {
				console.log(err.stack);
				callback(err, null);
			}
		});
	},
	updatePassenger : function(req, callback) {
		Passenger.findOne({ _id: req.params.passenger_id }, function(err, result) {
			if(!err) {
				if(result) {
					passengerConverter.mergeJsonIntoDao(result, req);
					result.save(function(err, result) {
						if(!err) {
							callback(null, result);	
						} else {
							callback(err, null);
						}
					});
					
				} else {
					console.log("No result found for id: " + req.params.passenger_id);
					callback({ message : "No result found for id: " + req.params.passenger_id}, null);
				}
			} else {
				callback(err, null);
			}
		});

	},
	getPassengerById : function(req, callback) {
			console.log("result from getPassengerById");
		Passenger.findById(req.params.passenger_id, function(err, result) {
			console.log("result from getPassengerById: " + JSON.stringify(result));
			if(!err) {
				callback(null, result);
			} else {
				callback({ message: "Error occured during the passenger retrieve.", error: err }, null);
			}
		});
	},
	deletePassenger : function(req, callback) {
		Passenger.findByIdAndRemove(req.params.passenger_id, function(err, result) {
			if(!err) {
				callback(null, result);
			} else {
				callback(err, null);
			}
		});
	},
	deleteAll : function(callback) {
		Passenger.remove({}, function(err, result) {
			if(!err) {
				callback(null, result);
			} else {
				callback(err, null);
			}
		});	
	},
	addAll : function(passengers, callback) {
		Passenger.create(passengers, function(err, insertedPassengers) {
			if(!err) {
				callback(null, insertedPassengers);
			} else {
				callback(err, null);
			}
		});
	}

};

module.exports = PassengerService;