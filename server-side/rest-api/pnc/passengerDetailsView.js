var inherits = require('util').inherits;
var CommonItemsPncView = require('./commonItemsPncView');

var PassengerDetailsView = function() {
    CommonItemsPncView.call(this);
};

inherits(PassengerDetailsView, CommonItemsPncView);

module.exports = PassengerDetailsView;