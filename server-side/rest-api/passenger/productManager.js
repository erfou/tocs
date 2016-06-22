var productService = require('app_modules/crud-api').products.services;
var ProductView = require('./productView');

var productManager = {
    getByCategories : function(category, callback) {
        var categoryView = {
            label: category, //TODO récupérer le label de la catégorie plutôt que le code
            products: [],
        };
        productService.getProductsByCategory(category, function(err, result) {
           if(!err) {
               for(var product of result.products) {
                   categoryView.products.push(new ProductView(product));
               }
               callback(null, categoryView);
           } else {
               callback(err, null);
           }
        });
    }
};

module.exports = productManager;