'use strict';

//** Dependencies **//
var api = require(appRoot + '/src/server/routes/api');

//** Controllers Array**//
var controllers = [];

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
		path: '/home',
		method: 'GET',
		handler: function(request, reply){
			reply('What up!- home');
		}	
	}
];

/** Collect Routes **/ 
var routes = common.concat(api);
// when adding more routes concat(api,ui,etc)

//** Export Routes **//
module.exports = routes;