var Category = require('./categoryDao');

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
			type : categoryDao.type,
		 	description : categoryDao.description,		
		 	compatibleClasses : categoryDao.compatibleClasses			
		};
	},
	daoListToJson : function(categoryListDao) {
		var categoriesForm = { categories: [] };
		for (var category of categoryListDao) {
			categoriesForm.categories.push(this.daoToJson(category));
		}
		return categoriesForm;
	},
	
	mergeJsonIntoDao : function(categoryDao, req) {
		initFields.call(this, categoryDao, req);
		
	},
};

function initFields(categoryDao, req) {
		categoryDao.name = req.body.name;
		categoryDao.type = req.body.type;
		categoryDao.description = req.body.description;
		categoryDao.compatibleClasses = req.body.compatibleClasses;
}

module.exports = CategoryConverter;
