var crudApi = require('app_modules/crud-api');
var productService = crudApi.products.services;
var categoryService = crudApi.categories.services;
var ProductView = require('./productView');
var async = require('async');

var productManager = {
    getByCategories : function(req, callback) {
      var categoryView = {
        token: req.body.token,
        label: "", //TODO récupérer le label de la catégorie plutôt que le code
        products: [],
      };
      async.waterfall([
        function(callback) {
          categoryService.getCategoryById(req.params.category, function(err, result) {
            if(!err) {
              if(result) {
                callback(null, result);
              } else {
                callback({ error: "Category " + req.params.category + " not found"}, null);
              }
            } else {
              callback(err, null);
            }
          });
        },
        function(category, callback) {
          categoryView.label = category.name;
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
      ], function(err, result) {
        if(!err) {
          callback(null, result);
        } else {
          callback(err, null);
        }
      });
    }
};

module.exports = productManager;