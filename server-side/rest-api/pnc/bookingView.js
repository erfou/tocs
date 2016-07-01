var BookingView = function(order) {
    this.seat = order.passenger.seat;
    this.booking = order.product.name;
    this.quantity = order.quantity;
    this.links = [
    	{
    		label: "Valider",
    		rel: "self validate",
    		href: "/pnc/bookings/validate/" + order._id
    	},
    	{
    		label: "Annuler",
    		rel: "self cancel",
    		href: "/pnc/bookings/cancel/" + order._id
    	}
    ]
};

module.exports = BookingView;
