'use strict';

/** dependencies **/ 
var Hapi = require('hapi');
var routes = require(appRoot + '/src/server/routes');
var settings = require(appRoot + '/src/server/config/settings');



var Inert = require('inert'); //***test

// new server instance
var server = new Hapi.Server();

server.register(Inert, () => {}); //***test

// configure connection
server.connection({
	port: settings.get('hapi:port')
});

// add routes 
server.route(routes);

// start server
server.start(function () {
	console.log('Server listening @ ' + server.info.uri);
});