var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var productSchema = new Schema({
	name: String,
	catgorie: String,
	type: String,
	description: String,
	price: Number,
    currency: String
});

module.exports = mongoose.model('Product', productSchema);