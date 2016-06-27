
var SeatInfosView = function(seat) {
	this.seat = {
		label: "Siège " + seat._id,
		fareClass: seat.fareClass,
		occuped: seat.occuped,
	};

	var passenger = seat.currentPassenger;
	if(passenger) {
		var personnalInfos = passenger.personnalInfos;
		if(personnalInfos) {
			var fullName = personnalInfos.title + " " + personnalInfos.firstname + " " + personnalInfos.lastname;
			
			this.passenger = {
				label:	fullName,
				links: [{
					label: "Détails",				
					rel: "self",
					href: "/pnc/passengers/" + seat.currentPassenger._id
				}],
				pnr: passenger.pnr
			};
		} else {
			this.error = "No personnalInfos for passenger: " + passenger;
		}
	}
};

module.exports = SeatInfosView;