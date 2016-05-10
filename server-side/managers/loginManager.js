var seatService = require('../services/seatService');

var loginManager = {
    
    login : function(req, callback) { 
        console.log("from loginManager: " + req);
        var loginForm = {
          seat: {},
          links: [
            {
                rel: "Continue",
                herf: "/clients/home/"
            }
          ]
        };
        seatService.getSeatByPosition(req.body.position, function(err, result) {
            if(!err) {
                console.log("from loginManager: " + result);
                loginForm.seat = result;
                callback(loginForm);
            } else {
                console.log("from loginManager: " + err);
                callback(err);
            }
        });
        
    }
};

module.exports = loginManager;