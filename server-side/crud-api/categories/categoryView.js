function CategoryView (seatId, categoryJson) {
    this.name = categoryJson.name;
    this.id = categoryJson._id;
    this.description = categoryJson.description;
	  this.compatibleClasses = [
	    "ECO",
	    "PRE",
	    "BUS"
	  ];
    this.link = {
      rel: categoryJson.name,
      href: "/clients/seat/" + seatId + "/category/" + categoryJson._id
    };
    
}

module.exports = CategoryView;

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
					"href": "/clients/seat/20B/category/5735715aacff1e1c0f000001"
				  }
				},
*/