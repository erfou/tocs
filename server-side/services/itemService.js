var Item = require('../models/itemDao');
var itemConverter = require('../converters/itemConverter');
var ItemService = {
	getAllItems : function(req, res) {
		Item.find({'categoryId' : req.params.category_id},function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				console.log("Error occured during retrieve of seats list: " + err);
				res.json({ message: "Error occured during retrieve of seats list."})
			}
		})
	},
	addNewItem : function(req, res) {
		var itemDao = itemConverter.jsonToDao(req);
		itemDao.save(function(err, result) {
			if(!err) {
				res.json(itemConverter.daoToJson(result));	
			} else {
				console.log(err.stack);
				res.json(err)
			}
		});
	},
	updateItem : function(req, res) {
		Item.findById(req.params.item_id, function(err, result) {
			if(!err) {
				if(result) {
					itemConverter.mergeJsonIntoDao(result, req);
					result.save(function(err, result) {
						if(!err) {
							res.json(itemConverter.daoToJson(result));	
						} else {
							res.json(err);
						}
					});
					
				} else {
					res.json({ message : "No result found for id: " + req.params.item_id});
				}
			} else {
				res.json(err);
			}
		})

	},
	getItemById : function(req, res) {
		Item.findById(req.params.item_id, function(err, result) {
			if(!err) {
				res.json(itemConverter.daoToJson(result));
			} else {
				res.json({ message: "Error occured during the seat retrieve.", error: err })
			}
		})
	},
	deleteItem : function(req, res) {
		Item.findByIdAndRemove(req.params.item_id, function(err, result) {
			if(!err) {
				res.json(result);
			} else {
				res.json(err);
			}
		})
	}
}

module.exports = ItemService;