var async = require('async');
/*TODO : check what is required here*/
var crudApi = require('app_modules/crud-api');
var Tokenizer = require('./tokenizer');
var HomeView = require('./homeView');

var CategoryService = crudApi.categories.services;
var CategoryView = crudApi.categories.view;

var homeManager = {
    
    load : function(req, callback) {
        
        async.waterfall([
            function(callback) { 
                Tokenizer.detokenize(req.body.token, function(err, passenger) {
                    if(!err) {
                        callback(null, passenger);
                    } else {
                        callback(err, null);
                    }
                });
            },
            function(passenger, callback) {
                CategoryService.getCategoriesByFareClass(passenger.seat.fareClass, function(err, result) {
                    if(!err) {
                        callback(null, passenger.seat, result);
                    } else {
                        console.log("err occured during retrieve of categories from homeManager: " + err);
                        callback(err, null, null);
                    }
                });
            }
        ],
        function(err, seat, result) {
            if(!err) {
                var homeView = new HomeView(seat, 0);
                if(result.categories) {
            		for (var category of result.categories) {
            			homeView.categoriesView.categories.push(new CategoryView(category));
            		}
                }
                callback(null, homeView);
            } else {
                callback(err, null);
            }
            // results is now equal to ['one', 'two']
        });
    }
};

module.exports = homeManager;
