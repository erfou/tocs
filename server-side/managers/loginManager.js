var seatService = require('../services/seatService');

var loginManager = {
    
    login : function(req, callback) { 
        
        var loginForm = {
          seat : {},
          nextStep : "/clients/home/"
        };
        seatService.getSeatByPosition(req.body.position, function(err, result) {
            if(!err) {
                loginForm.seat = result;
                callback(loginForm);
            } else {
                callback(err);
            }
        });
        
    }
};

module.exports = loginManager;