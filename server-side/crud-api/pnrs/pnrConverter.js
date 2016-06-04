var Pnr = require('./pnrDao');

var PnrConverter = {

	jsonToDao : function(pnr) {
		if(pnr.body) {
			pnr = reqToResult(pnr);
		}
		var pnrDao = new Pnr();
		initFields.call(this, pnrDao, pnr);
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
	
	mergeJsonIntoDao : function(pnrDao, pnr) {
		if(pnr.body) {
			pnr = reqToResult.call(this, pnr);
		}
		initFields.call(this, pnrDao, pnr);
		
	},
};

function initFields(pnrDao, pnr) {
		pnrDao._id = pnr.record_locator;
		pnrDao.passengers = pnr.passengers;
}

function reqToResult(req) {
	return {
		record_locator : req.body.record_locator,
		passengers : req.body.passengers
	}
}
module.exports = PnrConverter;
