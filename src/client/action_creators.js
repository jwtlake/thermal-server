// action constants
export const ADD_SENSOR = 'ADD_SENSOR';
export const LOAD_SENSORS = 'LOAD_SENSORS';
export const GET_READINGS = 'GET_READINGS';
export const NEW_READING = 'NEW_READING';

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

//*** not yet implemented ***//
export function getReadings(sensorId,readings) {  
  return {
    type: GET_READINGS,
    id: sensorId,
    readings: readings
  };
}

export function addSensor(sensor) {  
  return {
    type: ADD_SENSOR,
    sensor: sensor
  };
}