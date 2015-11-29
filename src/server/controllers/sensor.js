/*eslint camelcase:0 */

'use strict';

var models = require(appRoot + '/src/server/models');

module.exports = {
	list: function(request, reply) {
		new models.Sensor()
		.fetch({
			withRelated: ['SensorType']
		}).then(function(sensor){
			reply(sensor);
		});
	}
}