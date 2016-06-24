function CategoryView (categoryJson) {
    this.name = categoryJson.name;
    this.id = categoryJson._id;
    this.type = categoryJson.type;
    this.description = categoryJson.description;
	  this.compatibleClasses = categoryJson.compatibleClasses;
    this.link = {
      rel: categoryJson.name,
      href: "/passenger/" + categoryJson._id
    };
    
}

module.exports = CategoryView;
