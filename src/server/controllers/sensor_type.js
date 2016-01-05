/*eslint camelcase:0 */

'use strict';

var models = require(appRoot + '/src/server/models');

module.exports = {
	//** SensorType
	list: function(request, reply) {
		new models.SensorType()
		.fetchAll().then(function(sensor_type){
			reply(sensor_type).code(200);
		}, function(err) {
			reply('Failed to List: '+ err).code(500);
		});
	}
}