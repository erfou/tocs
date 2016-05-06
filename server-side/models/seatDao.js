var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var seatSchema = new Schema({
	position: {
		row: String,
		column: String
	},
	status: String
});

module.exports = mongoose.model('Seat', seatSchema);