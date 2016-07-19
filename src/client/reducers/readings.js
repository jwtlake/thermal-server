import * as types from '../action_creators.js';
import { List, Map, fromJS } from 'immutable';

const initialState = Map();

function readings(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_READINGS: // merge historical readings with push readings, historical overwrites push readings.
      return state.updateIn([action.sensorId,action.id], readings => readings.merge(fromJS(action.readings))); //TODO how is this working again?

    case types.LOAD_SENSORS: // overwrites existing readings and creats map keys for each sensor
      const sensors = fromJS(action.sensors);
      return sensors.reduce( (map, sensor) => map.setIn([sensor.get('id').toString(), sensor.get('current_reading_id').toString()], sensor.get('current_reading')),Map() );

    case types.NEW_READING: // handle socket.io push style reading updates
      const newReading = fromJS(action.reading);
      return state.setIn([ newReading.get('sensor_id').toString(), newReading.get('id').toString() ], newReading);

    default: // default return on unknown action type
      return state;
  }
}

export default readings;
