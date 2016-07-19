/** dependencies **/
var bookshelf = require(appRoot + '/src/server/config/bookshelf');
var Events = require(appRoot + '/src/server/events');

// temperature sensor
var Sensor = bookshelf.Model.extend({
	tableName: 'sensor',
	hasTimestamps: true,
	current_reading: function(){
		return this.belongsTo(Reading,'current_reading_id');
	},
	sensor_type: function() { 
		return this.belongsTo(SensorType);
	},
	readings: function() {
		return this.hasMany(Reading);
	},
	constructor: function() {
		var self = this;
		bookshelf.Model.apply(this, arguments);

		// on sensor table update, trigger update event
		this.on('updated', function(sensor) {
			//console.log('on update:' + sensor.attributes.current_reading_id);

			// get latest reading
			new Reading({id: sensor.attributes.current_reading_id})
			.fetch({
				require: true //only trigger if we find a result
			}).then(function(reading) {

				// create new reading data
				var newReading = {
					id: reading.attributes.id,
					sensor_id: reading.attributes.sensor_id,
					temperature: reading.attributes.temperature,
					reading_at: reading.attributes.reading_at
				}

				//send push update to clients
				Events.update(newReading);
			});
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
