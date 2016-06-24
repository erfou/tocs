var inherits = require('util').inherits;
var CommonItemsPncView = require('./commonItemsPncView');

var ServiceSeatMapView = function() {
	CommonItemsPncView.call(this);
	this.seatMapView = [];
};

inherits(ServiceSeatMapView, CommonItemsPncView);

module.exports = ServiceSeatMapView;
