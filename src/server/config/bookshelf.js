'use strict';

/** dependencies **/ 
var settings = require(appRoot + '/src/server/config/settings');

//SQL query builder lib
var knex = require('knex')({
  client: 'pg',
  connection: {
    host: settings.get('postgress:host'),
    user: settings.get('postgress:user'),
    password: settings.get('postgress:password'),
    database: settings.get('postgress:database')
  }
});

// ORM lib
var bookshelf = require('bookshelf')(knex);

// export
module.exports = bookshelf;