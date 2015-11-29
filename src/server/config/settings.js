'use strict';

// libary for settings
var nconf = require('nconf');

// example connection settings
var defaults = {
	hapi:{
		port: 3000
	},
	postgress:{
		host: 'localhost',
		port: '5432',
		user: 'postgres',
		password: 'da87bzZd',
		database: 'thermal'
	}
};

// set default settings
nconf.defaults(defaults);

// TODO# add enviorments and hidden connection strings

// export
module.exports = nconf;
