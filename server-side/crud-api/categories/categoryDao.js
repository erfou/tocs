var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var categorySchema = new Schema({
	name: String,
	description: String,
	type: String,
	compatibleClasses: [String]
});

module.exports = mongoose.model('Category', categorySchema);