var StringUtils = require('app_modules/stringUtils');

var seatInfosView = function(seat) {
	this.seat = {
		label: "Siège " + seat._id,
		fareClass: seat.fareClass,
		occuped: seat.occuped,
	};

	if(seat.currentPassenger) {
		var personnalInfos = seat.currentPassenger.personnalInfos;
		var fullName = personnalInfos.title + " " + personnalInfos.firstname + " " + personnalInfos.lastname;
		var urlizableFullName = StringUtils.replaceAll(fullName, " ", "_").toLowerCase();
		
		this.passenger = {
			label:	fullName,
			links: [{
				label: "Détails",				
				rel: "self",
				href: "/pnc/" + urlizableFullName + "/details"
			}]
		};
	}
};

module.exports = seatInfosView;