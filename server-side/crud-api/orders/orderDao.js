var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var orderSchema = new Schema({
	passenger: { type: Schema.Types.ObjectId, ref: 'Passenger' },
	quantity: Number,
	product: { type: Schema.Types.String, ref: 'Product' },
	seat: { type: Schema.Types.String, ref: 'Seat' }
});

module.exports = mongoose.model('Order', orderSchema);