var async = require('async');
var crudApi = require('app_modules/crud-api');
var Tokenizer = require('./tokenizer');

var CategoryService = crudApi.categories.services;
var CategoryView = crudApi.categories.view;
var SeatView = crudApi.seats.view;

var homeManager = {
    
    load : function(req, callback) {
        var homeView = {
            token: req.body.token,
    		breadcrumbElements: [
    			{
    				link: {
    					rel: "Acceuil",
    					href: "/clients/home"
    				},
    				current: true
    			}
    		],
            seatView: {},
            categoriesView : {
			    title: "Services disponibles",
                categories: []
            }
        };
        
        async.waterfall([
            function(callback) { 
                Tokenizer.detokenize(req.body.token, function(err, result) {
                    if(!err) {
                        callback(null, result);
                    } else {
                        callback(err, null);
                    }
                });
            },
            function(clientInfos, callback) {
                var seat = clientInfos.seat;
                CategoryService.getCategoriesByFareClass(seat.fareClass, function(err, result) {
                    if(!err) {
                        callback(null, seat, result);
                    } else {
                        console.log("err occured during retrieve of categories from homeManager: " + err);
                        callback(err, null, null);
                    }
                });
            }
        ],
        // optional callback
        function(err, seat, result) {
            if(!err) {
                homeView.seatView = new SeatView(seat);
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