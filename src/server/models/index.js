/*eslint no-use-before-define:0 */
//what is this? Makes javascript evaluate everything before running things? 

/** dependencies **/
var bookshelf = require(appRoot + '/src/server/config/bookshelf');
var Events = require(appRoot + '/src/server/events');

// temperature sensor
var Sensor = bookshelf.Model.extend({
	tableName: 'sensor',
	hasTimestamps: true,
	sensortype: function() { 
		return this.belongsTo(SensorType);
	},
	readings: function() {
		return this.hasMany(Reading);
	},
	constructor: function() {
		var self = this;
		bookshelf.Model.apply(this, arguments);

		// on sensor table update, trigger update event
		this.on('updated', function(model) {
			var message = {
				id: model.attributes.id,
				current_reading: model.attributes.current_reading,
				reading_at: model.attributes.reading_at
			}
			Events.update(message);
		});
	}
});

// temperature sensor type
var SensorType = bookshelf.Model.extend({
	tableName: 'sensor_type',
	hasTimestamps: true
});

// temperature sensor reading
var Reading = bookshelf.Model.extend({
	tableName: 'reading',
	hasTimestamps: true,
	sensor: function() {
		return this.belongsTo(Sensor);
	}
});

// export
module.exports = {
	Reading: Reading,
	Sensor: Sensor,
	SensorType: SensorType
};