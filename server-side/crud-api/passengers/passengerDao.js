var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var passengerSchema = new Schema({
	pnr: { type: String, ref: 'Pnr' },
	seat: { type: String, ref: 'Seat' },
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
});

module.exports = mongoose.model('Passenger', passengerSchema);
