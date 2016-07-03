var async = require('async');
var orderService = require('app_modules/crud-api').orders.services;
var request = require('request');

var ledsAddr = "192.168.0.205";

var reqShutDownAll = "http://" + ledsAddr + "/Z";
var hasBeenShutDown = true;

var LedsManager = {
    switchLeds: function(ledsToLight, typeOfView) {
      console.log("hasBeenShutDown: " + hasBeenShutDown);
      if("security" == typeOfView) {
        if(!hasBeenShutDown) {
          console.log("shuting down leds...");
          shutDownAllLights.call(this, function(err,result) {
      //        if(!err) {
                hasBeenShutDown = true;
                 console.log("start leds light...");
                  for(var led of ledsToLight) {
                      lightLedOfASeat.call(this, led, "R", function(err, result) {
                        if(!err) {
                          console.log(result);
                        } else {
                          console.log(err);
                        }
                      });
                  }
      //        } else {
      //            console.log("leds can't shuting down, we don't light leds");
      //        }
          });
        }
      } else {
        if(hasBeenShutDown) {
          initAllLights.call(this);
        }
      }

    } 
};

function initAllLights() {
  console.log("initAllLights");
  async.waterfall([
      function(callback) {
        shutDownAllLights.call(this, function(err, result) {
//          if(!err) {
            callback();
//          } else {
//            callback(err);
//          }
        });

      },function(callback) {
        var seatOfConfirmedOrders = [];
        var seatOfWaitingOrders = [];
        orderService.getAllOrdersFullPopulated(function(err, orders) {
          if(!err) {
            if(orders) {
              console.log(JSON.stringify(orders));
              for(var order of orders) {
                console.log(JSON.stringify(order));
                if(!order.cancelled) {
                  var orderSeat = order.passenger.seat._id ? order.passenger.seat._id : order.passenger.seat;
                  console.log(JSON.stringify(orderSeat));
                  if(order.confirmed) {
                    seatOfConfirmedOrders.push(orderSeat);
                  } else {
                    seatOfWaitingOrders.push(orderSeat);
                  }
                }
              }

              callback(null, seatOfWaitingOrders, seatOfConfirmedOrders);
            } else {
              callback({ error: "No orders found."})
            }
          }
        });
      }, function(seatOfWaitingOrders, seatOfConfirmedOrders, callback) {
        console.log("start light...");
        async.each(seatOfWaitingOrders, function(seatWaitOrder, callback) {
          lightLedOfASeat.call(this, seatWaitOrder, "B", function(err, result) {
            if(!err) {
              console.log(result);
            } else {
              console.log(err);
            }
          });
        }, function(err) {
          if(!err) {
            callback();
          } else {
            callback(err);
          }
        });
        async.each(seatOfConfirmedOrders, function(seatWaitOrder, callback) {
          lightLedOfASeat.call(this, seatWaitOrder, "G", function(err, result) {
            if(!err) {
              console.log(result);
            } else {
              console.log(err);
            }
          });
        }, function(err) {
          if(!err) {
            callback();
          } else {
            callback(err);
          }
        });
      }
    ], function(err) {
      if(err) {
        console.log(err);
      } else {
        hasBeenShutDown = false;
      }
    });
};

function shutDownAllLights(callback) {
  console.log("shutDownAll: " + reqShutDownAll);
  request
    .get(reqShutDownAll)
    .on('error', function(err) {
      callback(err, null);
      console.log(err);
    })
    .on('response', function(response) {
      callback(null, error);
      console.log("leds correctly shut down: " + response);
    });

};

function lightLedOfASeat(seatId, rgb, callback) {
  var ledId = seatId.substring(1, seatId.length);
  var reqLightIt = "http://" + ledsAddr + "/" + ledId + rgb;
  console.log("lightIt: " + reqLightIt);
  request
    .get(reqLightIt)
    .on('error', function(err) {
      callback(err);
    })
    .on('response', function(response) {
      callback(null, response);
      console.log("leds correctly shut down: " + response);
    });  
};

module.exports = LedsManager;
