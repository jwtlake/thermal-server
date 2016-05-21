import React from 'react';
import rd3 from 'rd3';
import d3 from 'd3';

const parseDate = d3.time.format.iso.parse;
const LineChart = rd3.LineChart;

class HistoryChart extends React.Component {

	render() {
		const {
			props: { sensors, readings }
		} = this;

		const lineData = sensors.reduce((array,sensor) => {
			const readings = this.props.readings.get(sensor.get('id').toString()).toJS()
			return array.concat({
			 	name: sensor.get('name'),
			 	values: readings.map(reading => {
			 		return({
						x: reading.reading_at,
			 			y: reading.temperature
			 		});
			 	}) 
			});
		},[])

		return(
			<LineChart
				circleRadius={0}
				title="Today"
				legend={true}
				data={lineData}
				width='100%'
				height={400}
				viewBoxObject={{
					x: 0,
					y: 0,
					width: '700',
					height: 400
				}}

				//Y Axis
				yAxisLabel="Temperature"
  				yAxisTickIntervel={{interval: 5}}
  				// yAxisTickValues
  			    yAxisLabelOffset={60}
  				yAxisFormatter={(d)=> { return d + ' ºF' }}
  				yAccessor={(d)=> {
  					//return d.temperature;
  					return d.y;
  					}
  				}

  				//X Axis
				xAxisLabel="Time"
  				xAxisTickInterval={{unit: 'hour'}}
				xAccessor={(d)=> {
					//return parseDate(d.reading_at);
					return parseDate(d.x);
					}     
				}
				
  				domain={{ y: [-30,120]}} //x: [,0]
				// gridHorizontal={true}
				// gridVertical={true}
			/>
		);
	}
};

// Export
export default HistoryChart;

// filterReadings(readings,'today')
// function filterReadings(readings, filterOption){
// 	//ADD filterOption
// 	return readings.filter(reading => {	
// 		const d = new Date(reading.reading_at);
// 		const now = new Date();

// 		if(d.toDateString() === now.toDateString()){
// 			return true;
// 		}else{
// 			return false;
// 		}
// 	})
// }
