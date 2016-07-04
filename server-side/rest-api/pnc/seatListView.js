var inherits = require('util').inherits;
var CommonItemsPncView = require('./commonItemsPncView');
var SeatInfosView = require('./seatInfosView');

var SeatListView = function(seats) {
    CommonItemsPncView.call(this);
    this.seatInfosView = [];
    if(seats) {
		for(var seat of seats) {
			this.seatInfosView.push(new SeatInfosView(seat));
		}
    }
};

SeatListView.prototype.initSeatInfosViewFromSeatList = function(seats) {
	for(var seat of seats) {
		this.seatInfosView.push(new SeatInfosView(seat));
	}
}

inherits(SeatListView, CommonItemsPncView);

module.exports = SeatListView;
