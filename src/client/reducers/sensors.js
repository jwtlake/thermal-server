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
        (sensor.get('id') === action.reading.sensor_id) ?
          sensor.mergeDeep(Map({
            current_reading_id: action.reading.id,
	    reading_at: action.reading.reading_at,
	    current_reading: fromJS(action.reading) //TODO should i get rid of this and just use current_reading_id?
          })):
          sensor
      );
      
    default: // default return on unknown action type
      return state;
  }
}

export default sensors;
