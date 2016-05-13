'use strict';

//** Dependencies **//
var api = require(appRoot + '/src/server/routes/api');

//** Controllers Array**//
var controllers = [];

/** Common Routes **/ 
var common = [
	{
		method: 'GET',
		path: '/{path*}',
		handler: function (request, reply) {
			reply.file(appRoot + '/src/client/public/index.html');
		}
	},
	{
		method: 'GET',
		path: '/bundle.js',
		handler: function (request, reply) {
			reply.file(appRoot + '/src/client/public/bundle.js');
		}
	}
];

/** Collect Routes **/ 
var routes = common.concat(api);
// when adding more routes concat(api,ui,etc)

//** Export Routes **//
module.exports = routes;