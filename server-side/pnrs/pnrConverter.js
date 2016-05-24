var Pnr = require('./pnrDao');

var PnrConverter = {

	jsonToDao : function(req){
		var pnrDao = new Pnr();
		initFields.call(this, pnrDao, req);
		return pnrDao;
	},
	
	daoToJson : function(pnrDao){
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
		var pnr = jsonToResult.call(this, req);
		initFields.call(this, pnrDao, pnr);
		
	},
};

function initFields(pnrDao, pnr) {
		pnrDao._id = pnr.record_locator;
		pnrDao.passengers = pnr.passengers;
}

function jsonToResult(input) {
		var result;
		if(input.params && input.body) {
			result = {};
			result.passengers = {};
			result.record_locator = input.params.record_locator;
			result.passengers = input.body.passengers;
		} else {
			result = input;
		}
		
		return result;
}

module.exports = PnrConverter;
