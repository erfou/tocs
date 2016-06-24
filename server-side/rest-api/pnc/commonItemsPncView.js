var CommonItemsPncView = function(){
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
    };
    this.burgerMenuView = {
        label: "Menu",
        links: [{
            label: "Liste des passagers",
            rel: "passengers",
            href: "/pnc/passengers/",
        },{
            label: "Liste des services",
            rel: "services",
            href: "/pnc/services/",
        },{
            label: "Messages",
            rel: "messages",
            href: "/pnc/messages/",
        }],
    };
};

module.exports = CommonItemsPncView;
