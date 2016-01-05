'use strict';

/** dependencies **/ 
var settings = require(appRoot + '/src/server/config/settings');

//SQL query builder lib
var knex = require('knex')({
  client: 'pg',
  connection: {
    host: settings.get('postgres:host'),
    user: settings.get('postgres:user'),
    password: settings.get('postgres:password'),
    database: settings.get('postgres:database')
  }
});

// ORM lib
var bookshelf = require('bookshelf')(knex);

// export
module.exports = bookshelf;