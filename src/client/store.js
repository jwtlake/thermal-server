import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';

export default function makeStore() {
  return createStore(rootReducer);
}