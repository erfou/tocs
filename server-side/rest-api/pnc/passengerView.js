var DateFormat = require('dateformat');
DateFormat.masks.frenchDate = 'dd-mm-yyyy';

var passengerView = function (passenger) {
    this.personnalInfos = {};
    this.personnalInfos.title = passenger.personnalInfos.title;
    this.personnalInfos.firstname = passenger.personnalInfos.firstname;
    this.personnalInfos.lastname = passenger.personnalInfos.lastname;
    this.personnalInfos.birthdate = DateFormat(passenger.personnalInfos.birthdate, "frenchDate");
    /*
    this.meals = [];
    for(var meal of passenger.meals) {
        var mealView = {};
        mealView.label = meal.label;
        this.meals.push(mealView);
    }
    */
    this.seat = {};
    this.seat.label = "Siège " + passenger.ticket.seat;
    this.seat.fareClass = passenger.ticket.fareClass;
    this.seat.link = {
        label: "Détails",
        rel: "details",
        href: "/pnc/seat/" + passenger.ticket.seat
    };
};

module.exports = passengerView;
