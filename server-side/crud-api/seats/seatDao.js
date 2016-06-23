var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var seatSchema = new Schema({
	_id: String,
	position: {
		row: String,
		column: String
	},
	fareClass: String,
	occuped: Boolean,
	belted: Boolean,
	currentPassenger: { type: Schema.Types.ObjectId, ref: 'Passenger' }
});

module.exports = mongoose.model('Seat', seatSchema);