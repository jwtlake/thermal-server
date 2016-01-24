//** Dependencies **//
var io = require('socket.io');
var socket;

// exports
exports.startSocketListener = function(listener) {
	socket = io(listener);
	socket.on('connection', function (socket) {
		console.log('new connection');
	});
}

exports.update = function(data) {
	socket.emit('newReading',data);
}