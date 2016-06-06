var serviceSeatMapView = function() {
    this.slideView = {
        label: "Vue",
        links: [{
            label: "Services",
            rel: "service",
            href: "/pnc/seat-map/service"
        },{
            label: "Sécurité",
            rel: "security",
            href: "/pnc/seat-map/security"
        }]
    },
    
    this.burgerMenuView = {
        label: "Menu",
        links: [{
            label: "Liste des passagers",
            rel: "passengers",
            href: "/pnc/passenger/list",
        },{
            label: "Liste des services",
            rel: "services",
            href: "/pnc/service/list",
        },{
            label: "Messages",
            rel: "messages",
            href: "/pnc/message/list",
        }],
    },
	
	this.seatMapView = []
};

module.exports = serviceSeatMapView;
