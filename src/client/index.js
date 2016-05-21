import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import io from 'socket.io-client';

import makeStore from './store';
import { loadSensors, newReading, loadReadings, getReadings_Async } from './action_creators';

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
import fetch from 'isomorphic-fetch'; //require('es6-promise').polyfill();

fetch('/api/sensors').then(function(response) {
	if (response.status >= 400) {
	    throw new Error("Bad response from server");
	}
	return response.json();
})
.then(function(json) {
	// var normalizedJson = normalize(json, arrayOf(sensor));
  	store.dispatch(loadSensors(json));
});


setTimeout(() => {
  store.dispatch(getReadings_Async('1'));
  store.dispatch(getReadings_Async('2'));
},2000);


// // Debug - Log changes to store
// let unsubscribe = store.subscribe(() => {
//   console.log('store update');
//   console.log(store.getState().get('readings').toJS())
//   }
// );


// setTimeout(() => {
//   store.dispatch(newReading(createRandomReading(1)));
//   store.dispatch(newReading(createRandomReading(2)));
// },1000)


// // Debug - Simulate NewMessage Events 
// setInterval(() => {
//   const sensorId = Math.floor(Math.random() * 2) + 1;
//   store.dispatch(newReading(createRandomReading(sensorId)));
// },10000);

// function createRandomReading(sensorId) {
//   const now = new Date();
//   return {
//     id: null, //this is kinda tricky because im getting the sensor object not the reading object
//     sensor_id: sensorId,
//     temperature: (Math.floor(Math.random() * (110 - 55 + 1)) + 55).toString(),
//     reading_at: now.toISOString()
//   }
// }