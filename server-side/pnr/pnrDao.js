var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var pnrSchema = new Schema({
	recordLocator: String,
	passengers: [
		{
			personnalInfos: {
				title: String, //can be Mr,Mrs, Miss ?
				fisrtname: String,
				lastname: String,
				birthdate: Date
			},
			meals: [
				{
					label: String
				}
			]

		}
	]

}
);

module.exports = mongoose.model('Pnr', pnrSchema);