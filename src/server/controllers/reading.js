/*eslint camelcase:0 */

'use strict';

var models = require(appRoot + '/src/server/models');

module.exports = {
	//** Reading
	get: function(request, reply) {
		var id = request.params.id;
		var start = request.query.start;
		var end = request.query.end;

		//default query
		function where(qb) {
			qb.where({sensor_id:id})
			.orderBy('reading_at','desc');
		}

		//check for date range
		if(typeof start !== 'undefined' && typeof end !== 'undefined') {
			where = function(qb) {
				qb.where({sensor_id:id})
				.andWhere('reading_at','>=',start)
				.andWhere('reading_at','<=',end)
				.orderBy('reading_at','desc');
			}
		}

		new models.Reading().query(where).fetchAll({
			// withRelated: ['sensor'],
			require: true //only trigger then if we find a result
		}).then(function(readings) {
			reply(readings).code(200);
		}, function(err) {
			reply('Failed to Get '+ err).code(500);
		});
	},
	create: function(request, reply) {
		var id = request.params.id;
		var temperature = request.payload.temperature;
		var readingtime = new Date(request.payload.readingtime);

		console.log('new report post id: '+ id + ' temp: '+ temperature + ' time: '+ readingtime);

		var newReading = {
			sensor_id: id,
			temperature: temperature,
			reading_at: readingtime
			// created_at: //current timestamp *creates by default
			// updated_at: //current timestamp *creates by default
		};

		//first insert a new reading into the reading table then update the current temp on the sensor table
		new models.Reading(newReading)
			.save()
			.then(function(reading) {
				
				//update sensor current temp
				var id = reading.attributes.sensor_id;
				var newCurrent_reading = reading.attributes.temperature;
				var newReading_at = reading.attributes.reading_at;
				
				new models.Sensor({id: id})
				.fetch({
					require: true //only trigger if we find a result
				}).then(function(sensor) {
					
					//check if the new reading is more recent then sensor current reading
					var SensorNewReading_at = sensor.attributes.reading_at;
					var ReadingNewReading_at = newReading_at;
					if(typeof SensorNewReading_at === 'undefined'  || ReadingNewReading_at > SensorNewReading_at) {
						sensor.save({
							current_reading: newCurrent_reading,
							reading_at: newReading_at
						})
						.then(function(sensor) {
							reply(sensor).code(201);
						}, function(err) {
							//failed to update sensor current reading
							reply('Failed to Update Sensor: '+ err).code(500);
						});
					} else {
						//should return both sensor and reading.. 
						reply(sensor).code(201);
					}

				}, function(err) {
					//failed to update sensor table
					reply('Failed to Get Sensor for Update: '+ err).code(500);
				});				

			}, function(err) {
				//failed to insert into readings table
				reply('Failed to Create: '+ err).code(500);
			});
	},	
	delete: function(request, reply) {
		var id = request.params.id;
		new models.Reading({id: id})
		.fetch({require: true}) //only trigger then if we find a result
		.then(function(reading) {
			reading.destroy()
			.then(function() {
				reply('Deleted').code(200);	
			});
		}, function(err) {
			reply('Failed to Delete: '+ err).code(500);
		});
	}
}