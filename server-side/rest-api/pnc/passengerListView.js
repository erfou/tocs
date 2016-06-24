var inherits = require('util').inherits;
var CommonItemsPncView = require('./commonItemsPncView');

var PassengerListView = function() {
    CommonItemsPncView.call(this);
    this.passengerInfosView = [];
};

inherits(PassengerListView, CommonItemsPncView);

module.exports = PassengerListView;
