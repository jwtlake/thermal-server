import * as types from '../action_creators.js';
import { List, Map, fromJS } from 'immutable';

const initialState = Map();

function app(state = initialState, action) {
  switch (action.type) {
    default: // default return on unknown action type
      return state;
  }
}

export default app;