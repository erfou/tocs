var async = require('async');
var categoryService = require('../categories').services;
var seatService = require('../seats').services;
var SeatView = require('../seats').view;
var CategoryView = require('../categories').view;

var homeManager = {
    
    load : function(req, callback) {
        
        var homeView = {
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
        
        async.series([
            function(callback) { 
                seatService.getSeatById(req.params.seat_id, function(err, result) {
                    if(!err) {
                        callback(null, new SeatView(result));
                    } else {
                        console.log(err);
                        callback(err, null);
                    }
                });
            },
            function(callback) { 
                categoryService.getAllCategories(req.body.position, function(err, result) {
                    if(!err) {
                        callback(null, result);
                    } else {
                        console.log("err occured during retrieve of categories from homeManager: " + err);
                        callback(err, null);
                    }
                });
            }
        ],
        // optional callback
        function(err, results) {
            if(!err) {
                homeView.seatView = results[0];
                if(results[1].categories) {
            		for (var category of results[1].categories) {
            			homeView.categoriesView.categories.push(new CategoryView(results[0].id, category));	
            		}
                }
                homeView.categories = results[1];
                callback(null, homeView);
            } else {
                callback(err, null);
            }
            // results is now equal to ['one', 'two']
        });
    }
};

module.exports = homeManager;