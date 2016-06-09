'use strict';

/** dependencies **/ 
var knexfile = require('./knexfile');
// var knex = require('knex');

// Get settings from knexfile
var connection = knexfile.development.connection;
var connWithoutDBInfo = {
  host: connection.host,
  user: connection.user,
  password: connection.password,
  charset: 'utf8'
};

console.log('Importing settings.js config...');
console.log(connection);

// Connect to postgres server
var knex = require('knex')({ client: 'pg', connection: connWithoutDBInfo});

// Drop database if it exists
console.log('DROP DATABASE IF EXISTS ' + connection.database + ';');
knex.raw('DROP DATABASE IF EXISTS ' + connection.database + ';')
.then(function(){
  // Create database
  console.log('CREATE DATABASE ' + connection.database + ';');
  knex.raw('CREATE DATABASE ' + connection.database + ';')
  .then(function(){ 
    // Disconnect
    console.log('Disconnecting...');
    knex.destroy(function(){
      
      // Reconnect to the new database
      console.log('Reconnecting...');
      knex = require('knex')(knexfile.development);
      
      // Migrate to latest database schema
      console.log('Migrate:latest');
      knex.migrate.latest([knexfile])
      .then(function(){
        
        // Seed database with defaults
        console.log('Seed:run');
        knex.seed.run([knexfile])
        .then(function(){
          
          // Close connection
          console.log('Disconnecting...');
          knex.destroy();
          console.log('Done.');
        })
      })
    })
  })
});