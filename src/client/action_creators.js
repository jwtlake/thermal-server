// action constants
export const ADD_SENSOR = 'ADD_SENSOR';
export const LOAD_SENSORS = 'LOAD_SENSORS';
export const GET_READINGS = 'GET_READINGS';
export const NEW_READING = 'NEW_READING';
export const LOAD_READINGS = 'LOAD_READINGS';

// action creators
export function loadSensors(sensors) {
	return {
		type: LOAD_SENSORS,
		sensors: sensors
	};
}

export function newReading(reading) {  
	return {
		type: NEW_READING,
		reading: reading
	};
}

export function loadReadings(sensorId,readings) {  
	const action = {
		type: LOAD_READINGS,
		sensorId: sensorId,
		readings: readings
	};
	return action;
}

// async action creators
import fetch from 'isomorphic-fetch'; //require('es6-promise').polyfill();
import Moment from 'moment';

export function getSensors_Async() {
	return function(dispatch) {
		const apiCall = '/api/sensors';
		return fetch(apiCall).then(
			response => response.json(),
			error => console.log('error'+ error)
		).then(
			json => dispatch(loadSensors(json))
		);
	};
}

export function getReadings_Async(sensorId) {
	return function (dispatch) {
		const apiCall = '/api/sensors/'+sensorId+'/readings?start='+Moment().startOf('day').toISOString()+'&end='+Moment().endOf('day').toISOString()+'&orderBy=asc'; // console.log(apiCall);
		return fetch(apiCall).then(
			response => response.json(),
			error => console.log('error'+ error)
		).then(
			json => dispatch(loadReadings(sensorId, json))
		);
	};
}


//*** not yet implemented ***//
export function addSensor(sensor) {  
  return {
    type: ADD_SENSOR,
    sensor: sensor
  };
}
