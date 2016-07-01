var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var orderSchema = new Schema({
	passenger: { type: Schema.Types.ObjectId, ref: 'Passenger' },
	quantity: Number,
	fromPNR: Boolean,
	product: { type: Schema.Types.String, ref: 'Product' },
});

module.exports = mongoose.model('Order', orderSchema);