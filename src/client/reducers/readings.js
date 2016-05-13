import * as types from '../action_creators.js';
import { List, Map, fromJS } from 'immutable';

const initialState = Map();

function readings(state = initialState, action) {
  switch (action.type) {
    // case types.GET_READINGS:
    //   return state;

    case types.LOAD_SENSORS: // overwrites existing readings and creats map keys for each sensor
      const sensors = fromJS(action.sensors);
      return sensors.reduce( (map, sensor) => map.set( sensor.get('id').toString(), List() ), Map() )

    case types.NEW_READING: // handle socket.io push style reading updates
      const newReading = fromJS(action.reading);
      const sensor_id = newReading.get('sensor_id').toString();
      return state.updateIn(sensor_id, readings => readings.push(newReading));

    default: // default return on unknown action type
      return state;
  }
}

export default readings;