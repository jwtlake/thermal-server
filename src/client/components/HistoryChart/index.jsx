import React from 'react';
import { VictoryChart, VictoryAxis, VictoryLine } from "victory";
// import Line from './Line';
import moment from 'moment';

class HistoryChart extends React.Component {

	render() {
		const {
			props: { sensors, readings }
		} = this;

		return(
			<VictoryChart animate={{duration: 200}}>
			  <VictoryAxis dependentAxis label="Temperature"  />
			  <VictoryAxis 				  
			  	  scale="time"
				  // tickValues={[
				  //   new Date(1980, 1, 1),
				  //   new Date(1990, 1, 1),
				  //   new Date(2000, 1, 1),
				  //   new Date(2010, 1, 1),
				  //   new Date(2020, 1, 1)]}
				    tickFormat={(x) => {
				    	moment(x).format('MM/DD/YYYY h:mm a');
				    }}
    		  />
				{
					sensors.map(sensor => {
						const sensorReadings = readings.get(sensor.get('id').toString()).toJS();
						const sensorReadingsLimited = sensorReadings.slice(-200);
						return (
							<VictoryLine 
								key={sensor.get('id')}
								data={sensorReadingsLimited}
								x={"reading_at"}
								y={"temperature"} 
							/>
						);
					})
				}
			</VictoryChart>
		);
	}
};

// Export
export default HistoryChart;

// tickValues={[0,25,50,75,100]}