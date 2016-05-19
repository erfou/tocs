var Item = require('./itemDao');
var itemConverter = require('./itemConverter');
var ItemService = {
	getAllItems : function(req, callback) {
		Item.find({'categoryId' : req.params.category_id},function(err, results) {
			if(!err) {
				callback(null, itemConverter.daoListToJson(results));
			} else {
				console.log("Error occured during retrieve of seats list: " + err);
				callback({ message: "Error occured during retrieve of seats list."}), null;
			}
		});
	},
	addNewItem : function(req, callback) {
		var itemDao = itemConverter.jsonToDao(req);
		itemDao.save(function(err, result) {
			if(!err) {
				callback(null, itemConverter.daoToJson(result));	
			} else {
				console.log(err.stack);
				callback(err, null);
			}
		});
	},
	updateItem : function(req, callback) {
		Item.findById(req.params.item_id, function(err, result) {
			if(!err) {
				if(result) {
					itemConverter.mergeJsonIntoDao(result, req);
					result.save(function(err, result) {
						if(!err) {
							callback(null, itemConverter.daoToJson(result));	
						} else {
							callback(err, null);
						}
					});
					
				} else {
					callback({ message : "No result found for id: " + req.params.item_id}, null);
				}
			} else {
				callback(err, null);
			}
		});

	},
	getItemById : function(req, callback) {
		Item.findById(req.params.item_id, function(err, result) {
			if(!err) {
				callback(null, itemConverter.daoToJson(result));
			} else {
				callback({ message: "Error occured during the seat retrieve.", error: err }, null);
			}
		});
	},
	deleteItem : function(req, callback) {
		Item.findByIdAndRemove(req.params.item_id, function(err, result) {
			if(!err) {
				callback(null, result);
			} else {
				callback(err, null);
			}
		});
	}
};

module.exports = ItemService;