var socketio = require('socket.io')
var seatService = require('app_modules/crud-api').seats.services;
var customEventEmitter = require('./customEventEmitter');

module.exports.listen = function(app){
	var io = socketio.listen(app);
	io.of("/pnc")
	.on("connection", function (socket) {
		console.log('New client');
		customEventEmitter.on("updateSeat", function(updatedSeat) {
		    socket.emit("updateSeat", updatedSeat);
		});
	});

    return io;
};