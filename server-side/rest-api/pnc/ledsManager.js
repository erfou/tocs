var request = require("request");

var ledsAddr = "192.168.0.205";

var LedsManager = {
    shutDownAll: function() {
        request
          .get('http://' + ledsAddr + "/Z")
          .on('error', function(err) {
            console.log(err);
          })
          .on('response', function(response) {
            console.log("leds correctly shut down: " + response);
          });
    },
    lightIt: function(ledId, rgb) {
        request
          .get('http://' + ledsAddr + "/" + ledId + rgb)
          .on('error', function(err) {
            console.log(err);
          })
          .on('response', function(response) {
            console.log("leds correctly shut down: " + response);
          });
    },
};

module.exports = LedsManager;
