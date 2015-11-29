'use strict';

//** Dependencies **//
var api = require(appRoot + '/src/server/controllers/api');

//** Controllers Array**//
var controllers = [];

/** Common Controllers **/ 
var common = {
	//maybe add something here
};

//** Collect Controllers **/ 
controllers['common'] = common;
controllers['api'] = api;

//** Exports **//
module.exports = controllers;