'use strict';

// var Joi = require('joi');
var models = require(appRoot + '/src/server/models');
var sensorController = require(appRoot + '/src/server/controllers/sensor');

// export
module.exports = [
	{
		path: '/'
		method: 'GET',
		handler: function(request, reply){
			reply('Hello World.');
		}
	},

//** Sensor 
	{
		path: '/api/sensors'
		method: 'GET',
		handler: sensorController.list
	}
];
