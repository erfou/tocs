function CategoryView (categoryJson) {
    this.name = categoryJson.name;
    this.id = categoryJson._id;
    this.type = categoryJson.type;
    this.description = categoryJson.description;
	this.compatibleClasses = categoryJson.compatibleClasses;
    this.link = {
      rel: categoryJson.name,
      href: "/passenger/" + categoryJson.type + "/" + categoryJson._id
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