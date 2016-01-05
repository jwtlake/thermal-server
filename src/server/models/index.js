/*eslint no-use-before-define:0 */
//what is this? Makes javascript evaluate everything before running things? 

/** dependencies **/
var bookshelf = require(appRoot + '/src/server/config/bookshelf');

// temperature sensor
var Sensor = bookshelf.Model.extend({
	tableName: 'sensor',
	sensortype: function() { 
		return this.belongsTo(SensorType);
	},
	readings: function() {
		return this.hasMany(Reading);
	},
	hasTimestamps: true
});

// temperature sensor type
var SensorType = bookshelf.Model.extend({
	tableName: 'sensor_type',
	hasTimestamps: true
});

// temperature sensor reading
var Reading = bookshelf.Model.extend({
	tableName: 'reading',
	sensor: function() {
		return this.belongsTo(Sensor);
	},
	hasTimestamps: true
});

// export
module.exports = {
	Reading: Reading,
	Sensor: Sensor,
	SensorType: SensorType
};