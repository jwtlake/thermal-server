'use strict';

var models = require(appRoot + '/src/server/models');

//** Reading
module.exports = {

	get: function(request, reply) {
		var id = request.params.id;
		var start = request.query.start;
		var end = request.query.end;
		var orderBy = request.query.orderBy;
		
		// default query
		var qb = new models.Reading().query({where:{sensor_id:id}});
		
		// check for query strings
		if(start) {
			qb.query().andWhere('reading_at','>=',start);
		}

		if(end) {
			qb.query().andWhere('reading_at','<=',end);
		}

		if(orderBy === 'desc') {
			qb.query().orderBy('reading_at','desc');
		} else {
			qb.query().orderBy('reading_at','asc');
		}

		// execute query
		qb.fetchAll({
			// withRelated: ['sensor'],
			require: true //only trigger then if we find a result
		}).then(function(readings) {
			reply(
				removeUnchangedReadings(
					readings.toJSON()
				)
			).code(200);
		}, function(err) {
			reply('Failed to Get '+ err).code(500);
		});
	},
	create: function(request, reply) {
		var id = request.params.id;
		var temperature = request.payload.temperature;
		var readingtime = new Date(request.payload.readingtime);

		// console.log('new report post id: '+ id + ' temp: '+ temperature + ' time: '+ readingtime);

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
				
				//saved Reading values
				var id = reading.attributes.id;
				var sensor_id = reading.attributes.sensor_id;
				var reading_at = reading.attributes.reading_at;
				
				//update Sensor to reflect current reading
				new models.Sensor({id: sensor_id})
				.fetch({
					require: true //only trigger if we find a result
				}).then(function(sensor) {
					
					//check if the new reading is more recent then sensor current reading
					var MostRecent_SensorReading_at = sensor.attributes.reading_at;
					var New_ReadingReading_at = reading_at;
					if(typeof MostRecent_SensorReading_at === 'undefined'  || New_ReadingReading_at > MostRecent_SensorReading_at) {
						sensor.save({
							current_reading_id: id,
							reading_at: reading_at
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

// Filter functions
// Experiment to see if performance would improve. Function removes unchaged readings before sending data to the client. Should return two readings for each period of unchanged reading. (first reading at x temp and the last reading at x temp)
function removeUnchangedReadings(readings) {
	return(
		readings.reduce(function(array, nextReading){
			var lastReading = array[array.length - 1]; 
			if(typeof lastReading === 'undefined' || nextReading.temperature !== lastReading.temperature) {
				// add new readings for the first reading or a changed reading
				array.push(nextReading);
				return array;
			}else{
				// in the case of repeated/ unchanged temperatues keep records for the start and end time of the given temperatue.
				var secondToLastReading = array[array.length - 2];
				if(typeof secondToLastReading !== 'undefined' && lastReading.temperature === secondToLastReading.temperature) {
					array.pop();
				}
				array.push(nextReading);
				return array;
			}
		}, [])
	);
}
