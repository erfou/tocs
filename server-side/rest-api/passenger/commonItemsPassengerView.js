var SeatView = require('app_modules/crud-api').seats.view;

var breadcrumbTabElements = [
        {
            label: "Accueil",
            rel: "home",
            href: "/passenger/home"
        }
    ];

var CommonItemsPassengerView = function(seat, breadcrumbStep){
    this.seatView = new SeatView(seat);
    this.breadcrumbView = getBreadcrumb(breadcrumbStep);
};

function getBreadcrumb(breadcrumbStep) {
    var breadcrumbView = [];
    for(var i=0; i <= breadcrumbStep; i++) {
        var tempBreadCrumb = breadcrumbTabElements[i];
        if(i == breadcrumbStep) {
            tempBreadCrumb.current = true;
        } else {
            tempBreadCrumb.current = false;
        }
        breadcrumbView.push(tempBreadCrumb);
    }
    return breadcrumbView;
}
module.exports = CommonItemsPassengerView;
