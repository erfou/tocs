function SeatView (seatJson) {
    this.title = "Siège " + seatJson._id;
    this.id = seatJson._id;
    this.link = {
      rel: "Détails",
      href: "/clients/seat/" + seatJson._id
    };
    
}
module.exports = SeatView;