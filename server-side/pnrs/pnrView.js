function PnrView (seatId, pnrJson) {
    this.name = pnrJson.name;
    this.id = pnrJson._id;
    this.description = pnrJson.description;
	  this.compatibleClasses = [
	    "ECO",
	    "PRE",
	    "BUS"
	  ];
    this.link = {
      rel: pnrJson.name,
      href: "/clients/seat/" + seatId + "/pnr/" + pnrJson._id
    };
    
}

module.exports = PnrView;

/*
				{
				  "_id": "5735715aacff1e1c0f000001",
				  "name": "Repas",
				  "description": "Choisir un repas",
				  "compatibleClasses": [
				    "ECO",
				    "PRE",
				    "BUS"
				  ],
				  "link": {
					"rel": "Repas",
					"href": "/clients/seat/20B/pnr/5735715aacff1e1c0f000001"
				  }
				},
*/