var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var seatSchema = new Schema({
	_id: String,
	position: {
		row: String,
		column: String
	},
	occuped: Boolean
});

module.exports = mongoose.model('Seat', seatSchema);