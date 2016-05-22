var Seat = require('./seatDao');

var SeatConverter = {

	jsonToDao : function(req){
		var seatDao = new Seat();
		var result = jsonToResult.call(this, req);
		initFields.call(this, seatDao, result);
		return seatDao;
	},
	pushToDao : function(req) {
		var seatDao = new Seat();
		var result = pushToResult.call(this, req);
		console.log("from pushToDao: " + result);
		initFields.call(this, seatDao, result);
		
		return seatDao;
	},
	daoToJson : function(seatDao){
		var result = {
			_id : seatDao._id,
			position : seatDao.position,
		 	occuped : seatDao.occuped			
		};
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
		var result = jsonToResult.call(this, req);
		initFields.call(this, seatDao, result);
		
	},
};

function initFields(seatDao, result) {
		var pos = result.position;
		seatDao._id = pos.row + pos.column;
		seatDao.position = pos;
		seatDao.occuped = result.occuped;
}

function jsonToResult(req) {
		var result = {};
		result.position = {};
		result.position = req.body.position;
		result.occuped = req.body.occuped;
		return result;
}

function pushToResult(req) {
		var result = {};
		result.position = {};
		result.position.column = req.params.seat_id.substring(req.params.seat_id.length - 1, req.params.seat_id.length);
		result.position.row = req.params.seat_id.substring(0, req.params.seat_id.length - 1);
		result.occuped = req.query.occuped;
		console.log("from pushToResult: " + result.toString());
		return result;
}

module.exports = SeatConverter;
