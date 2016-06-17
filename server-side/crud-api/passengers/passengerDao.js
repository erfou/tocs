var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var passengerSchema = new Schema({
	personnalInfos: {
		title: String, //can be Mr,Mrs, Miss ?
		firstname: String,
		lastname: String,
		birthdate: Date
	},
	pnr: { type: String, ref: 'Pnr' },
	seat: { type: String, ref: 'Seat' },
	meals: [{ type: String, ref: "Product" }]
});

module.exports = mongoose.model('Passenger', passengerSchema);
