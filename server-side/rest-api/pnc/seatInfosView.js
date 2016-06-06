var seatInfosView = function(seat) {
	this.seat_label = "Siège " + seat._id;
	var personnalInfos = seat.currentPassenger.personnalInfos;
	this.passenger_full_name = personnalInfos.title + " " + personnalInfos.firstname + " " + personnalInfos.lastname + " ";
	this.occuped = seat.occuped;
	this.fareClass = seat.fareClass;
}

module.exports = seatInfosView;