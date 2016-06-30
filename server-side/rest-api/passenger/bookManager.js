var async = require('async');
/*TODO : check what is required here*/
var crudApi = require('app_modules/crud-api');
var Tokenizer = require('./tokenizer');

var productService = crudApi.products.services;
var orderService = crudApi.orders.services;
var passengerService = crudApi.passengers.services;

var bookManager = {
    book: function(req, callback) {
        var bookingView = {};
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
                console.log("==============> product: " + JSON.stringify(product));
                console.log("==============> product.category: " + product.category);
                if(product.category == "meal") {
                    async.waterfall([
                        function(callback) {
                            orderService.getOrdersByPassenger(passenger._id, function(err, results) {
                                if(!err) {
                                    callback(null, results);
                                } else {
                                    callback(err, null);
                                }
                            });
                        },
                        function(orders, callback) {
                            var orderToUpdate = {};
                            orderToUpdate.body = {};
                            for(var order of orders) {
                                if(order.product.category == "meal") {
                                    orderToUpdate.body = order;
                                    orderToUpdate.body.product = product._id;
                                }
                            }
                            console.log("orderToUpdate: " + JSON.stringify(orderToUpdate));
                            orderService.updateOrder(orderToUpdate, function(err, updatedOrder) {
                                if(!err) {
                                    callback(null, updatedOrder);
                                } else {
                                    callback(err, null);
                                }
                            });
                        }
                    ], function(err, updatedOrder) {
                        if(!err) {
                            callback(null, passenger, product, updatedOrder);
                        } else {
                            callback(err, null, null, null);
                        }
                    });
                } else {
                    var orderAsReq = {
                        body: {
                            passenger: passenger,
                            product: product,
                            quantity: 1
                        }
                    };
                    orderService.addNewOrder(orderAsReq, function(err, result) {
                        if(!err) {
                            console.log("orderDaoId: " + result._id);
                            callback(null, passenger, product, result);
                        } else {
                            callback(err, null, null, null);
                        }
                    });
                }
            },
            function(passenger, product, order, callback) {
                passenger.orders.push(order._id);
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
                bookingView.token = token;
                callback(null, bookingView);
            } else {
                callback(err, null);
            }
        });
    }
};

module.exports = bookManager;
