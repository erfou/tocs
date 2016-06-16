var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var orderSchema = new Schema({
	passenger: { type: Schema.Types.ObjectId, ref: 'Passenger' },
	quantity: Number,
	product: { type: Schema.Types.ObjectId, ref: 'Product' },
	seat: { type: Schema.Types.ObjectId, ref: 'Seat' }
});

module.exports = mongoose.model('Order', orderSchema);