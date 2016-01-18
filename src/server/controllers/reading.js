/*eslint camelcase:0 */

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

		if(orderBy === 'asc') {
			qb.query().orderBy('reading_at','asc');
		} else {
			qb.query().orderBy('reading_at','desc');
		}

		// execute query
		qb.fetchAll({
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