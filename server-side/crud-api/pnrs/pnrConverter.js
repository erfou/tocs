var Pnr = require('./pnrDao');

var PnrConverter = {

	jsonToDao : function(req) {
		var pnrDao = new Pnr();
		initFields.call(this, pnrDao, req);
		return pnrDao;
	},
	
	daoToJson : function(pnrDao) {
		return {
			record_locator : pnrDao._id,
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

function initFields(pnrDao, pnr) {
		pnrDao._id = pnr.record_locator;
		pnrDao.passengers = pnr.passengers;
}

module.exports = PnrConverter;
