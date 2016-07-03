var request = require('request');

var ledsAddr = "192.168.0.205";

var reqShutDownAll = "http://" + ledsAddr + "/Z";

var LedsManager = {
    shutDownAll: function(callback) {
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
    },
    lightIt: function(ledId, rgb) {
      var reqLightIt = "http://" + ledsAddr + "/" + ledId + rgb;
      console.log("lightIt: " + reqLightIt);
        request
          .get(reqLightIt)
          .on('error', function(err) {
            console.log(err);
          })
          .on('response', function(response) {
            console.log("leds correctly shut down: " + response);
          });
    },
};

module.exports = LedsManager;
