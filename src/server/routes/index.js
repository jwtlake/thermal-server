'use strict';

//** Dependencies **//
var api = require(appRoot + '/src/server/routes/api');

//** Controllers Array**//
var controllers = [];

// var jsx = require(appRoot + '/src/client/script.jsx');
// console.log(jsx);


/** Common Routes **/ 
var common = [
	{
		path: '/',
		method: 'GET',
		handler: function(request, reply){
			reply('What up!');
		}
	},
	{
		method: 'GET',
		path: '/home',
		handler: function (request, reply) {
			reply.file(appRoot + '/src/client/index.html');
		}
	},
	{
		method: 'GET',
		path: '/style.css',
		handler: function (request, reply) {
			reply.file(appRoot + '/src/client/style.css');
		}
	},
	{
		method: 'GET',
		path: '/bundle.js',
		handler: function (request, reply) {
			reply.file(appRoot + '/src/client/bundle.js');
		}
	}
];

/** Collect Routes **/ 
var routes = common.concat(api);
// when adding more routes concat(api,ui,etc)

//** Export Routes **//
module.exports = routes;