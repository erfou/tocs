var Seat = require('../models/seatDao');

var SeatConverter = {

	jsonToDao : function(req){
		var seatDao = new Seat();
		seatDao.position = req.body.position;
		seatDao.occuped = req.body.occuped;
		return seatDao;
	},
	daoToJson : function(seatDao){
		return {
			position : seatDao.position,
		 	occuped : seatDao.occuped			
		};
	}
}

module.exports = SeatConverter;