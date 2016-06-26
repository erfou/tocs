var async = require('async');
/*TODO : check what is required here*/
var crudApi = require('app_modules/crud-api');
var Tokenizer = require('./tokenizer');

var CategoryService = crudApi.categories.services;
var seatService = crudApi.seats.services;
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
    					href: "/passenger/home"
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
                Tokenizer.detokenize(req.body.token, function(err, passenger) {
                    if(!err) {
                        callback(null, passenger);
                    } else {
                        callback(err, null);
                    }
                });
            },
            function(passenger, callback) {
              if(!passenger.seat._id) {
                  seatService.getSeatById(passenger.seat, function(err, result){
                      if(!err) {
                          passenger.seat = result;
                          callback(null, passenger);
                      } else {
                          
                      }
                  });
              } else {
                  callback(null, passenger);
              }
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