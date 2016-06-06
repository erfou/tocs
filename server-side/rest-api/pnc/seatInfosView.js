var StringUtils = require('app_modules/stringUtils');

var seatInfosView = function(seat) {
	this.seat = {
		label: "Siège " + seat._id,
		fareClass: seat.fareClass,
		occuped: seat.occuped,
		links: [{
			rel: "self",
			href: "/pnc/" + seat._id + "/details"
		}]
	};

	if(seat.currentPassenger) {
		var personnalInfos = seat.currentPassenger.personnalInfos;
		var fullName = personnalInfos.title + " " + personnalInfos.firstname + " " + personnalInfos.lastname;
		var urlizableFullName = StringUtils.replaceAll(fullName, " ", "_").toLowerCase();
		
		this.passenger = {
			label:	fullName,
			links: [{
				rel: "self",
				href: "/pnc/" + urlizableFullName + "/details"
			}]
		};
	}
};

module.exports = seatInfosView;