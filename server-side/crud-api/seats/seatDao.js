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
/*	currentPassenger: {
		personnalInfos: {
			title: String, //can be Mr,Mrs, Miss ?
			firstname: String,
			lastname: String,
			birthdate: Date
		},
		meals: [
			{
				label: String
			}
		],
		ticket: {
			seat: String,
			fareClass: String
		}
	
	},
*/
	currentPassenger: { type: Schema.Types.ObjectId, ref: 'Passenger' }
});

module.exports = mongoose.model('Seat', seatSchema);