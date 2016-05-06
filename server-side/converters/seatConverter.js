var Seat = require('../models/seatDao');

var SeatConverter = {

	jsonToDao : function(req){
		var seatDao = new Seat();
		var pos = req.body.position
		seatDao._id = pos.row + pos.column;
		seatDao.position = req.body.position;
		seatDao.occuped = req.body.occuped;
		return seatDao;
	},
	
	daoToJson : function(seatDao){
		return {
			_id : seatDao._id,
			position : seatDao.position,
		 	occuped : seatDao.occuped			
		};
	}
}

module.exports = SeatConverter;