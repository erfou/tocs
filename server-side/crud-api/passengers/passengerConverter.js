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

function initFields(passengerDao, obj) {
	if(obj.body) {
		obj = obj.body;
	}
	passengerDao._id = obj._id;
	passengerDao.pnr = obj.pnr;
	passengerDao.seat = obj.seat;
	passengerDao.personnalInfos = obj.personnalInfos;
	passengerDao.meals = obj.meals;
	passengerDao.ticket = obj.ticket;
}

module.exports = PassengerConverter;