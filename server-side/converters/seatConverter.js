var Seat = require('../models/seatDao');

var SeatConverter = {

	jsonToDao : function(req){
		var seatDao = new Seat();
		initFields.call(this, seatDao, req);
		return seatDao;
	},
	
	daoToJson : function(seatDao){
		return {
			_id : seatDao._id,
			position : seatDao.position,
		 	occuped : seatDao.occuped			
		};
	},
	
	mergeJsonIntoDao : function(seatDao, req) {
		initFields.call(this, seatDao, req);
		
	},
};

function initFields(seatDao, req) {
		var pos = req.body.position
		seatDao._id = pos.row + pos.column;
		seatDao.position = pos;
		seatDao.occuped = req.body.occuped;
}

module.exports = SeatConverter;