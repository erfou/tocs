var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var itemSchema = new Schema({
	name: String,
	description: String,
	catgorieId: String,
	price: Number,
    currency: String
});

module.exports = mongoose.model('Item', itemSchema);