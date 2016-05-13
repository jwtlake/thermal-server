import * as types from '../action_creators.js';
import { List, Map, fromJS } from 'immutable';

const initialState = List();

function sensors(state = initialState, action) {
  switch (action.type) {

    case types.LOAD_SENSORS: // overwrite sensors array with new array
      return fromJS(action.sensors);
    
    // case types.ADD_SENSOR:      
      // return state;

    // case types.UPDATE_SENSOR:      
      // return state;

    // case types.DELETE_SENSOR:
      // return state;

    case types.NEW_READING: // update sensor with current reading info
      return state.map(sensor =>
        sensor.get('id') === action.reading.sensor_id ?
          sensor.merge(Map({
            current_reading: action.reading.temperature,
            reading_at: action.reading.reading_at
          })):
          sensor
      );
      
    default: // default return on unknown action type
      return state;
  }
}

export default sensors;