var Pnr = require('./pnrDao');

var PnrConverter = {

	jsonToDao : function(req){
		var pnrDao = new Pnr();
		initFields.call(this, pnrDao, req);
		return pnrDao;
	},
	
	daoToJson : function(pnrDao){
		return {
			recordLocator : pnrDao.recordLocator,
			passengers : pnrDao.passengers,
		};
	},
	daoListToJson : function(pnrListDao) {
		var pnrsForm = { pnrs: [] };
		for (var pnr of pnrListDao) {
			pnrsForm.pnrs.push(this.daoToJson(pnr));	
		}
		return pnrsForm;
	},
	
	mergeJsonIntoDao : function(pnrDao, req) {
		initFields.call(this, pnrDao, req);
		
	},
};

function initFields(pnrDao, req) {
		pnrDao.recordLocator = req.body.name;
		pnrDao.passengers = req.body.passengers;
}


module.exports = PnrConverter;
