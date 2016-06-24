var async = require('async');
/*TODO : check what is required here*/
var crudApi = require('app_modules/crud-api');
var Tokenizer = require('./tokenizer');

var productService = crudApi.products.services;
var orderService = crudApi.orders.services;
var passengerService = crudApi.passengers.services;

var bookManager = {
    book: function(req, callback) {
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
            function(passenger, callback) {
                console.log("getProduct");
                productService.getProductById(req, function(err, result) {
                    if(!err) {
                        if(result) {
                            callback(null, passenger, result);
                        } else {
                            callback({ error: "No product found for id: " + req.params.product_id }, null, null);
                        }
                    } else {
                        callback(err, null, null);
                    }
                });
            },
            function(passenger, product, callback) {
                console.log("add order");
                var orderAsReq = {
                    body: {
                        passenger: passenger,
                        product: product,
                        quantity: 1
                    }
                };
                orderService.addNewOrder(orderAsReq, function(err, result) {
                    if(!err) {
                        callback(null, passenger, product, result);
                    } else {
                        callback(err, null, null, null);
                    }
                });
            },
            function(passenger, product, order, callback) {
                console.log("update passenger");
                passengerService.updatePassenger(passenger, function(err, result) {
                   if(!err) {
                       callback(null, result);
                   } else {
                       callback(err, null);
                   }
                });
            },
            function(updatePassenger, callback) {
                Tokenizer.tokenize(updatePassenger, function(err, result) {
                   if(!err) {
                       callback(null, result);
                   } else {
                       callback(err, null);
                   }
                });
            }
        ], function(err, token) {
            if(!err) {
                callback(null, token);
            } else {
                callback(err, null);
            }
        });
    }
};

module.exports = bookManager;
