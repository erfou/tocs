var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var categorySchema = new Schema({
	name: String,
	description: String,
	fareClasses: [String]
});

module.exports = mongoose.model('Category', categorySchema);