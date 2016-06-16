var Passenger = require('./passengerDao');

var PassengerConverter = {

	jsonToDao : function(req){
		var passengerDao = new Passenger();
		initFields.call(this, passengerDao, req);
		return passengerDao;
	},
	
	mergeJsonIntoDao : function(passengerDao, req) {
		initFields.call(this, passengerDao, req);
	},
};

function initFields(passengerDao, req) {
    	passengerDao.pnr = req.body.pnr;
		passengerDao.seat = req.body.seat;
		passengerDao.personnalInfos = req.body.personnalInfos;
		passengerDao.meals = req.body.meals;
		passengerDao.ticket = req.body.ticket;
}

module.exports = PassengerConverter;