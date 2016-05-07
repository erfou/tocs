var Category = require('../models/categoryDao');

var CategoryConverter = {

	jsonToDao : function(req){
		var categoryDao = new Category();
		initFields.call(this, categoryDao, req);
		return categoryDao;
	},
	
	daoToJson : function(categoryDao){
		return {
			_id : categoryDao._id,
			name : categoryDao.name,
		 	description : categoryDao.description,		
		 	fareClasses : categoryDao.fareClasses			
		};
	},
	
	mergeJsonIntoDao : function(categoryDao, req) {
		initFields.call(this, categoryDao, req);
		
	},
};

function initFields(categoryDao, req) {
		categoryDao.name = req.body.name;
		categoryDao.description = req.body.description;
		categoryDao.fareClasses = req.body.fareClasses;
}
module.exports = CategoryConverter;