var inherits = require('util').inherits;
var CommonItemsPncView = require('./commonItemsPncView');
var BookingView = require('./bookingView');

var BookingListView = function(orders) {
    CommonItemsPncView.call(this);
	this.bookingListView = [];
	for(var order of orders) {
		this.bookingListView.push(new BookingView(order));
	}
};

inherits(BookingListView, CommonItemsPncView);

module.exports = BookingListView;
