var inherits = require('util').inherits;
var CommonItemsPncView = require('./commonItemsPncView');

var SeatListView = function() {
    CommonItemsPncView.call(this);
    this.seatInfosView = [];
};

inherits(SeatListView, CommonItemsPncView);

module.exports = SeatListView;
