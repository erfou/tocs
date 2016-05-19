var Pnr = require('./pnrDao');
var pnrConverter = require('./pnrConverter');
var PnrService = {
	getAllCategories : function(req, callback) {
		Pnr.find(function(err, results) {
			if(!err) {
				callback(null, pnrConverter.daoListToJson(results));
			} else {
				console.log("Error occured during retrieve of seats list: " + err);
				callback({ message: "Error occured during retrieve of seats list."}, null);
			}
		});
	},
	addNewPnr : function(req, callback) {
		var pnrDao = pnrConverter.jsonToDao(req);
		pnrDao.save(function(err, result) {
			if(!err) {
				callback(pnrConverter.daoToJson(result), null);	
			} else {
				console.log(err.stack);
				callback(err, null);
			}
		});
	},
	updatePnr : function(req, callback) {
		Pnr.findById(req.params.pnr_id, function(err, result) {
			if(!err) {
				if(result) {
					pnrConverter.mergeJsonIntoDao(result, req);
					result.save(function(err, result) {
						if(!err) {
							callback(null, pnrConverter.daoToJson(result));	
						} else {
							callback(err, null);
						}
					});
					
				} else {
					callback({ message: "No result found for id: " + req.params.pnr_id}, null);
				}
			} else {
				callback(err, null);
			}
		});

	},
	getPnrById : function(req, callback) {
		Pnr.findById(req.params.pnr_id, function(err, result) {
			if(!err) {
				callback(null, pnrConverter.daoToJson(result));
			} else {
				callback({ message: "Error occured during the seat retrieve.", error: err }, null);
			}
		});
	},
	deletePnr : function(req, callback) {
		Pnr.findByIdAndRemove(req.params.pnr_id, function(err, result) {
			if(!err) {
				callback(null, result);
			} else {
				callback(err, null);
			}
		});
	}
};

module.exports = PnrService;