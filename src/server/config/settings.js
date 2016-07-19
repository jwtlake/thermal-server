'use strict';

// libary for settings
var nconf = require('nconf');

// example connection settings
var defaults = {
	hapi:{
		port: 3000
	},
	postgres:{
		host: 'localhost',
		port: '5432',
		user: 'jwtlake',
		password: 'da87bzZd',
		database: 'thermal'
	}
};

// set default settings
nconf.defaults(defaults);

// accept command-line args
nconf.argv();

// accept enviorment vars
nconf.env({
	separator:'__'
});

// export
module.exports = nconf;
