/*eslint camelcase:0 */

'use strict';

var models = require(appRoot + '/src/server/models');


//** Need to test and review **//

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
		var readingtime = request.payload.readingtime;

		console.log('new report post id: '+ id + ' temp: '+ temperature + ' time: '+ readingtime);

		var newReading = {
			sensor_id: id,
			temperature: temperature,
			reading_at: readingtime
			// created_at: //current timestamp *creates by default
			// updated_at: //current timestamp *creates by default
		};

		new models.Reading(newReading)
			.save()
			.then(function(reading) {
				reply(reading).code(201);
			}, function(err) {
				reply('Failed to Create: '+ err).code(500);
			});
	},	
	delete: function(request, reply) {
		reply('delete not yet implemented');
	}
}