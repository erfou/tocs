var Seat = require('./seatDao');
var PassengerHelper = require('app_modules/passengerHelper');

var SeatConverter = {

	jsonToDao : function(req){
		var seatDao = new Seat();
		var result = reqToResult.call(this, req);
		initFields.call(this, seatDao, result);
		return seatDao;
	},
	pushToDao : function(req) {
		var seatDao = new Seat();
		var result = pushToResult.call(this, req);
		initFields.call(this, seatDao, result);
		
		return seatDao;
	},
	daoToJson : function(seatDao){
		var result = {};
		result._id = seatDao._id;
		result.position = seatDao.position;
		result.fareClass = seatDao.fareClass;
	 	result.occuped = seatDao.occuped;
	 	result.belted = seatDao.belted;
	 	if(PassengerHelper.hasPassenger(seatDao)) {
		 	result.currentPassenger = seatDao.currentPassenger;
	 	}
		return result;
	},
	daoListToJson : function(seatListDao) {
		var seatsForm = { seats: [] };
		for (var seat of seatListDao) {
			seatsForm.seats.push(this.daoToJson(seat));	
		}
		return seatsForm;
	},
	
	mergeJsonIntoDao : function(seatDao, req) {
		var seat = req;
		if(req.body) {
			seat = reqToResult.call(this, req);
		}
		initFields.call(this, seatDao, seat);
		
	},
};

function initFields(seatDao, result) {
		var pos = result.position;
		seatDao._id = pos.row + pos.column;
		seatDao.position = pos;
		seatDao.fareClass = result.fareClass;
		seatDao.occuped = result.occuped;
		seatDao.belted = result.belted;
		seatDao.currentPassenger = result.currentPassenger
}

function reqToResult(req) {
		var result = {};
		result.position = {};
		result.position = req.body.position;
		result.occuped = req.body.occuped;
		result.belted = req.body.belted;
		result.fareClass = req.body.fareClass;
		result.currentPassenger = req.body.currentPassenger;
		return result;
}

function pushToResult(req) {
		var result = {};
		result.position = {};
		result.position.column = req.params.seat_id.substring(req.params.seat_id.length - 1, req.params.seat_id.length);
		result.position.row = req.params.seat_id.substring(0, req.params.seat_id.length - 1);
		result.occuped = req.query.occuped;
		result.belted = req.query.belted;
		return result;
}

module.exports = SeatConverter;
