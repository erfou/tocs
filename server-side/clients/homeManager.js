var async = require('async');
var categoryService = require('../categories').services;
var seatService = require('../seats').services;

var homeManager = {
    
    load : function(req, callback) {
        
        var homeForm = {
            seat: {},
            categories : {},
            links: [
                {
                    rel: "Mes services",
                    desc: "Visualiser la liste des services commandés.",
                    href: "/orders/:seat_id"
                }
            ]
        };
        
        async.series([
            function(callback) { 
                seatService.getSeatById(req.params.seat_id, function(err, result) {
                    if(!err) {
                        callback(null, result);
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
                        console.log("err occured during retrieve of categories from homeManager: " + err.categories[0].description);
                        callback(err, null);//callback(err, null);
                    }
                });
            }
        ],
        // optional callback
        function(err, results){
            if(!err) {
                homeForm.seat = results[0];
                homeForm.categories = results[1];
                callback(null, homeForm);
            } else {
                callback(err, null);
            }
            // results is now equal to ['one', 'two']
        });
    }
};

module.exports = homeManager;