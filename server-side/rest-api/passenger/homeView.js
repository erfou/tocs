var inherits = require('util').inherits;
var CommonItemsPassengerView = require('./commonItemsPassengerView');

var HomeView = function(seat, breadcrumbStep){
    CommonItemsPassengerView.call(this, seat, breadcrumbStep);
    this.categoriesView = {
        title: "Services disponibles",
        categories: []
    };
};

inherits(HomeView, CommonItemsPassengerView);

module.exports= HomeView;
