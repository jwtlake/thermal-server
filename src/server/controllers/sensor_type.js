/*eslint camelcase:0 */

'use strict';

var models = require(appRoot + '/src/server/models');

//** SensorType
module.exports = {
	list: function(request, reply) {
		new models.SensorType()
		.fetchAll().then(function(sensor_type){
			reply(sensor_type).code(200);
		}, function(err) {
			reply('Failed to List: '+ err).code(500);
		});
	},
	create: function(request, reply) {
		var name = request.payload.name;

		var newSensorType = {
			name: name
			// created_at: 
			// updated_at:
		};

		new models.SensorType(newSensorType)
			.save()
			.then(function(sensorType) {
				reply(sensorType).code(201);
			}, function(err) {
				reply('Failed to Create: '+ err).code(500);
			});
	},
	update: function(request, reply) {
		var id = request.params.id;
		var name = request.payload.name;

		new models.SensorType({id: id})
		.fetch({
			require: true //only trigger then if we find a result
		}).then(function(sensorType){
			sensorType.save({
				name: name || sensorType.get('name'),
			})
			.then(function(sensorType) {
				reply(sensorType).code(201);
			}, function(err) {
				reply('Failed to Update: '+ err).code(500);
			});
		}, function(err) {
			reply('Failed to Update: '+ err).code(500);
		});
	},
	delete: function(request, reply) {
		var id = request.params.id;
		new models.SensorType({id: id})
		.fetch({require: true}) //only trigger then if we find a result
		.then(function(sensorType) {
			sensorType.destroy()
			.then(function() {
				reply('Deleted').code(200);	
			});
		}, function(err) {
			reply('Failed to Delete: '+ err).code(500);
		});
	}
}