var seatInfosView = function(seat) {
	this.seat = {
		label: "Siège " + seat._id,
		fareClass: seat.fareClass,
		occuped: seat.occuped,
	};

	if(seat.currentPassenger) {
		var personnalInfos = seat.currentPassenger.personnalInfos;
		var fullName = personnalInfos.title + " " + personnalInfos.firstname + " " + personnalInfos.lastname;
		
		this.passenger = {
			label:	fullName,
			links: [{
				label: "Détails",				
				rel: "self",
				href: "/pnc/passenger/" + seat.currentPassenger._id
			}]
		};
	}
};

module.exports = seatInfosView;