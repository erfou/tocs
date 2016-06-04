var Pnr = require('./pnrDao');
var pnrConverter = require('./pnrConverter');
var PnrService = {
	getAllPnrs : function(callback) {
		Pnr.find(function(err, results) {
			if(!err) {
				callback(null, pnrConverter.daoListToJson(results));
			} else {
				console.log("Error occured during retrieve of pnrs list: " + err);
				callback({ message: "Error occured during retrieve of pnrs list."}, null);
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
		var pnr;
		if(req.body) {
			pnr = req.body;
		} else {
			pnr = req;
		}
		console.log("pnr from upadtePnr: " + JSON.stringify(pnr));
		Pnr.findById(pnr.record_locator, function(err, result) {
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
					callback({ message: "No result found for id: " + pnr.record_locator}, null);
				}
			} else {
				callback(err, null);
			}
		});
	},
	getPnrById : function(id, callback) {
		console.log(id);
		Pnr.findById(id, function(err, result) {
			if(!err) {
				callback(null, pnrConverter.daoToJson(result));
			} else {
				callback({ message: "Error occured during the pnr retrieve.", error: err }, null);
			}
		});
	},
	deletePnr : function(id, callback) {
		Pnr.findByIdAndRemove(id, function(err, result) {
			if(!err) {
				callback(null, result);
			} else {
				callback(err, null);
			}
		});
	},
	deleteAll : function(callback) {
		Pnr.remove({}, function(err, result) {
			if(!err) {
				callback(null, result);
			} else {
				callback(err, null);
			}
		});	
	},
	addAll : function(pnrs, callback) {
		Pnr.create(pnrs, function(err, insertedPnrs) {
			if(!err) {
				callback(null, insertedPnrs);
			} else {
				callback(err, null);
			}
		});
	}
};

module.exports = PnrService;
