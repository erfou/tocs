var Item = require('../models/itemDao');

var ItemConverter = {

	jsonToDao : function(req){
		var itemDao = new Item();
		initFields.call(this, itemDao, req);
		return itemDao;
	},
	
	daoToJson : function(itemDao){
		return {
			_id : itemDao._id,
			name : itemDao.name,
		 	description : itemDao.description,
		 	catgorieId : itemDao.catgorieId,
			price : itemDao.price,
			currency : itemDao.currency,
		};
	},
	
	mergeJsonIntoDao : function(itemDao, req) {
		initFields.call(this, itemDao, req);
	},
};

function initFields(itemDao, req) {
    	itemDao.name = req.body.name;
		itemDao.description = req.body.description;
		itemDao.catgorieId = req.body.catgorieId;
		itemDao.price = req.body.price;
		itemDao.currency = req.body.currency;
}

module.exports = ItemConverter;