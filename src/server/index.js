'use strict';

/** dependencies **/ 
var Hapi = require('hapi');
var Inert = require('inert');
var Events = require(appRoot + '/src/server/events');
var routes = require(appRoot + '/src/server/routes');
var settings = require(appRoot + '/src/server/config/settings');

// new server instance
var server = new Hapi.Server();

// static file serving
server.register(Inert, () => {});

// configure connection
server.connection({
	port: settings.get('hapi:port')
});

// add routes 
server.route(routes);

// start socketio service
Events.startSocketListener(server.listener);

// start server
server.start(function () {
	console.log('Server listening @ ' + server.info.uri);
});