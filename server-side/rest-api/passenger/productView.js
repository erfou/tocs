var productView = function(product) {
    this.label = product.name,
    this.description = product.description;
    this.price = product.price;
    this.currency = product.currency;
    this.type = product.type;
    this.links = [{
        rel:"self",
        label:"Commander",
        href:"/passenger/book/" + product._id
    }];
};

module.exports = productView;
