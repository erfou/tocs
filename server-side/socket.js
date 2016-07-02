var socketio = require('socket.io')
var seatService = require('app_modules/crud-api').seats.services;

module.exports.listen = function(app){
    io = socketio.listen(app)
	// Quand un client se connecte, on le note dans la console
	io.on('connection', function (socket) {
	    console.log('Un client est connecté !');
	    socket.emit("updateSeats", []);
//	    socket.emit('updateSeats', [{
//	    	_id: '6A',
//	    	occuped: true,
//	    	belted: false
//	    }]);
	    socket.on("updateSeatsCallback", function(data) {
	    	console.log(data);
			seatService.getAllSeats(function(err, allSeats) {

			});
		    socket.emit('updateSeats', [{
		    	_id: '6A',
		    	occuped: true,
		    	belted: false
		    }]);
//			console.log("event2:" + data);
//		    socket.emit("updateSeats", []);
	    });

	});

    return io;
}