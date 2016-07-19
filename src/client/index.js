import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import io from 'socket.io-client';

import makeStore from './store';
import { newReading, getReadings_Async, getSensors_Async } from './action_creators';

import App from './components/App';
import SensorCardListContainer from './containers/SensorCardList';
import HistoryChartContainer from './containers/HistoryChart';

// Create Store
const store = makeStore();
// console.log(store.getState().get('sensors'));

// Push Updates
var socket = io(); 
socket.on('newReading', function (message) {
  store.dispatch(newReading(message));
});

// Routes
const routes = 
<Route path="/" component={App}>
  <Route path="/dashboard" component={SensorCardListContainer} />
  <Route path="/trends" component={HistoryChartContainer} />
</Route>;

// Render
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes}
    </Router>
  </Provider>,
  document.getElementById('app')
);

// Get Sensors List
store.dispatch(getSensors_Async());

// Get things manualy for now
setTimeout(() => {
  store.getState().get('sensors').forEach(sensor => {
    store.dispatch(getReadings_Async(sensor.get('id').toString()));
  })
},2000);

// // Debug - Log changes to store
// let unsubscribe = store.subscribe(() => {
//   console.log('store update');
//   console.log(store.getState().get('readings').toJS())
//   }
// );
