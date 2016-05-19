var Pnr = require('./pnrDao');

var PnrConverter = {

	jsonToDao : function(req){
		var pnrDao = new Pnr();
		initFields.call(this, pnrDao, req);
		return pnrDao;
	},
	
	daoToJson : function(pnrDao){
		return {
			_id : pnrDao._id,
			name : pnrDao.name,
		 	description : pnrDao.description,		
		 	compatibleClasses : pnrDao.compatibleClasses			
		};
	},
	daoListToJson : function(pnrListDao) {
		var categoriesForm = { categories: [] };
		for (var pnr of pnrListDao) {
			categoriesForm.categories.push(this.daoToJson(pnr));	
		}
		return categoriesForm;
	},
	
	mergeJsonIntoDao : function(pnrDao, req) {
		initFields.call(this, pnrDao, req);
		
	},
};

function initFields(pnrDao, req) {
		pnrDao.name = req.body.name;
		pnrDao.description = req.body.description;
		pnrDao.compatibleClasses = req.body.compatibleClasses;
}

module.exports = PnrConverter;
