var async = require('async');
var categoryService = require('../services/categoryService');
var seatService = require('../services/seatService');

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
                        callback(result);
                    } else {
                        console.log(err);
                        callback(err);
                    }
                })
            },
            function(callback) { 
                categoryService.getAllCategories(req.body.position, function(err, result) {
                    if(!err) {
                        callback(homeForm);
                    } else {
                        callback(result);
                    }
                })
            }
        ],
        // optional callback
        function(err, results){
            if(!err) {
                homeForm.seat = results[0];
                homeForm.categories = results[1];
                callback(homeForm);
            } else {
                callback(err);
            }
            // results is now equal to ['one', 'two']
        });        

        categoryService.getAllCategories(req.body.position, function(err, result) {
            if(!err) {
                homeForm.categories = result;
                callback(homeForm);
            } else {
                callback(err);
            }
        });
        
    }
};

module.exports = homeManager;