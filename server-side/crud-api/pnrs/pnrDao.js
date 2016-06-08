var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var pnrSchema = new Schema({
	_id: String,

	passengers: [
		{
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

		}
	],

	passengersFromDb: { type: Schema.Types.ObjectId, ref: 'Passenger' }

});

module.exports = mongoose.model('Pnr', pnrSchema);