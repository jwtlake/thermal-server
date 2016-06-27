import React from 'react';
import { LineChart } from 'lucid-ui';
import moment from 'moment';
import _ from 'lodash';

class HistoryChart extends React.Component {

	render() {
		const {
			props: { sensors, readings }
		} = this;

		// Normalize reading data
		const data = _normalizeData(sensors, readings);

		// Get keys for y axis lookup
		const yAxisFields = sensors.toJS().map(sensor => sensor.id.toString());

		// Create legend data
		const legend = sensors.toJS().reduce((obj,sensor) => {
			obj[sensor.id.toString()] = sensor.name.toString();
			return obj;
		},{});

		// View port
		var minDate = moment().startOf('day').toDate();
		var maxDate = moment().endOf('day').toDate();

		// Formating
		const xFormatter = (d) => `${d.getMonth() + 1}-${d.getDate()}`;
		const yFormatter = (d) => `${d}°F`;

		return(
			<LineChart
				//Chart
				margin={{
					top: 100,
					right: 80,
					bottom: 100
				}}
				hasLegend={true}
				legend={legend}
				data={data}
				
				// X Axis (Date)
				xAxisTitle='Date'
				xAxisField={'reading_at'}
				// xAxisFormatter={xFormatter} // defaults to d3 date format
				xAxisMin={minDate}
				xAxisMax={maxDate}
				xAxisTickCount={10}
				
				// Y Axis (Temp)
				yAxisTitle='Temperature'
				yAxisFields={yAxisFields}
				yAxisFormatter={yFormatter}
				yAxisHasPoints={false}
				yAxisTickCount={5}
			/>
		);
	}
};

// Export
export default HistoryChart;

// Private Functions
function _normalizeData(sensors, readings){
	//TODO: Need to optimize this

	// Normalize readings to match lucid chart format
	const readingData = sensors.reduce((array,sensor) => {
		
		// Get readings for sensor
		const sensorReadings = readings.get(sensor.get('id').toString()).toJS()
		
		// Normalize format
		const normalizedReadings = sensorReadings.reduce((array,reading) => {
			var newReading = {
				'reading_at': moment(reading.reading_at).startOf('minute').toDate(),
				[sensor.get('id').toString()]: parseFloat(reading.temperature)
			}
			return array.concat(newReading);
		},[])

		return array.concat(normalizedReadings);
	},[])

	// Merge time stamps
	const readingData2 = readingData.reduce((array,reading) => {
		array[reading.reading_at] = _.merge({},array[reading.reading_at],reading);
		return array;
	},{})

	// Flatten readings
	const readingData3 = Object.keys(readingData2).map(key => readingData2[key])

	// Sort readings by date
	const finalReadingData = _.sortBy(readingData3, 'reading_at');

	return finalReadingData;
}
