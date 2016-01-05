'use strict';

// var Joi = require('joi');
var models = require(appRoot + '/src/server/models'); //dup?
var sensorController = require(appRoot + '/src/server/controllers/sensor');
var readingController = require(appRoot + '/src/server/controllers/reading');
var sensorTypeController = require(appRoot + '/src/server/controllers/sensor_type');

// export
module.exports = [

//** Sensor Type
	{
		path: '/api/sensorstypes',
		method: 'GET',
		handler: sensorTypeController.list
	},
//** Sensor 
	{
		path: '/api/sensors',
		method: 'GET',
		handler: sensorController.list
	},
	{
		path: '/api/sensors/{id}',
		method: 'GET',
		handler: sensorController.get
	},
	{
		path: '/api/sensors',
		method: 'POST',
		handler: sensorController.create
	},
	{
		path: '/api/sensors/{id}',
		method: 'PUT',
		handler: sensorController.update
	},
	{
		path: '/api/sensors/{id}',
		method: 'DELETE',
		handler: sensorController.delete
	},
//** Reading
	// {
	// 	path: '/api/sensors/readings',
	// 	method: 'GET',
	// 	handler: readingController.getCurrent
	// },
	{
		path: '/api/sensors/{id}/readings',
		method: 'GET',
		handler: readingController.get
	},
	{
		path: '/api/sensors/{id}/readings',
		method: 'POST',
		handler: readingController.create
	},
	{
		path: '/api/sensors/{id}/readings',
		method: 'DELETE',
		handler: readingController.delete
	}
];
