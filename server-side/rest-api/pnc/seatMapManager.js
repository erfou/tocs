var SeatService = require('app_modules/crud-api').seats.services;
var SeatInfosView = require('./seatInfosView');

var SeatMapManager = {
    seatMap : function(req, typeOfView, callback) {
    	var serviceSeatMapView = {
            
            slideView : {
                label: "Vue",
                links: [{
                    rel: "service",
                    href: "/pnc/seat-map/service"
                },{
                    rel: "security",
                    href: "/pnc/seat-map/security"
                }]
            },
            
            burgerMenuView : {
                label: "Menu",
                links: [{
                    rel: "passengers",
                    href: "/pnc/passenger/list",
                },{
                    rel: "services",
                    href: "/pnc/service/list",
                },{
                    rel: "messages",
                    href: "/pnc/message/list",
                }],
            },
    		
    		seatMapView : []
    	};
        SeatService.getAllSeats(function(err, allSeats) {
            if(!err) {
            	for(var seat of allSeats.seats) {
            		serviceSeatMapView.seatMapView.push(new SeatInfosView(seat));
            	}            	
                callback(null, serviceSeatMapView);
            } else {
                callback(err, null);
            }
        });
    }
};

module.exports = SeatMapManager;
