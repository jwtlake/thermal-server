/*eslint camelcase:0 */

'use strict';

var models = require(appRoot + '/src/server/models');

//** Sensor
module.exports = {
	list: function(request, reply) {
		new models.Sensor()
		.fetchAll({
			withRelated: ['current_reading'],
			require: true //only trigger then if we find a result
		}).then(function(sensor){
			reply(sensor).code(200);
		}, function(err) {
			reply('Failed to List: '+ err).code(500);
		});
	},
	get: function(request, reply) {		
		var id = request.params.id;
		new models.Sensor({id: id})
		.fetch({	
			withRelated: ['sensor_type','current_reading'],
			require: true //only trigger then if we find a result
		}).then(function(sensor){
			reply(sensor).code(200);
		}, function(err) {
			reply('Failed to Get: '+ err).code(500);
		});
	},
	create: function(request, reply) {
		var name = request.payload.name;
		var sensor_type_id = request.payload.sensor_type_id;
		var api_key = request.payload.api_key; //needs to be changed

		var newSensor = {
			name: name,
			sensor_type_id: sensor_type_id,
			api_key: api_key
			// created_at: 
			// updated_at:
			// current_reading_id:
			// reading_at:
		};

		new models.Sensor(newSensor)
			.save()
			.then(function(sensor) {
				reply(sensor).code(201);
			}, function(err) {
				reply('Failed to Create: '+ err).code(500);
			});
	},
	update: function(request, reply) {
		var id = request.params.id;
		var name = request.payload.name;
		var sensor_type_id = request.payload.sensor_type_id;
		var api_key = request.payload.api_key; //needs to be changed

		new models.Sensor({id: id})
		.fetch({
			withRelated: ['sensor_type'],
			require: true //only trigger if we find a result
		}).then(function(sensor) {
			sensor.save({
				name: name || sensor.get('name'),
				sensor_type_id: sensor_type_id || sensor.get('sensor_type_id'),
				api_key: api_key || sensor.get('api_key')
			})
			.then(function(sensor) {
				reply(sensor).code(201);
			}, function(err) {
				reply('Failed to Update: '+ err).code(500);
			});
		}, function(err) {
			reply('Failed to Update: '+ err).code(500);
		});
	},		
	delete: function(request, reply) {
		var id = request.params.id;
		new models.Sensor({id: id})
		.fetch({require: true}) //only trigger then if we find a result
		.then(function(sensor) {
			sensor.destroy()
			.then(function() {
				reply('Deleted').code(200);	
			});
		}, function(err) {
			reply('Failed to Delete: '+ err).code(500);
		});
	}
}
