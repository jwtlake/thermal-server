'use strict';

/** dependencies **/ 
var Hapi = require('hapi');
var Inert = require('inert');
var Events = require(appRoot + '/src/server/events');
var routes = require(appRoot + '/src/server/routes');
var settings = require(appRoot + '/src/server/config/settings');

// new server instance
var server = new Hapi.Server();

// static file serving
server.register(Inert, () => {});

// configure connection
server.connection({
	port: settings.get('hapi:port')
});

// add routes 
server.route(routes);

// start socketio service
Events.startSocketListener(server.listener);

// start server
server.start(function () {
	console.log('Server listening @ ' + server.info.uri);
});

// debug - simulate readings
if(settings.get('NODE_ENV') === 'dev') {
	console.log('Debug Mode On: Starting to simulate readings.');
	var readingcontroller = require(appRoot + '/src/server/controllers/reading');
	setInterval(() => {
		const sensorId = Math.floor(Math.random() * 2) + 1;
		const newReading = createRandomReading(sensorId);
		console.log('creating new reading. SensorId: '+ newReading.params.id + ' Temp: ' + newReading.payload.temperature);
		readingcontroller.create(newReading,function(){return {code: function (){}} });
	},10000);
	
	// function mimics restful api format
	function createRandomReading(sensorId) {
		const now = new Date();
		return {
			params: {id: sensorId},
			payload: {
				temperature: (Math.floor(Math.random() * (110 - 55 + 1)) + 55).toString(),
				readingtime: new Date()
			}
		}
	}
}
