import { combineReducers } from 'redux-immutable';
import app from './app';
import sensors from './sensors';
import readings from './readings';

export const rootReducer = combineReducers({
  app,
  sensors,
  readings
});