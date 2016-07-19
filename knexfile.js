'use strict';

// project root entry point for knex commands
var knexFile = require('./src/server/config/knex/knexfile.js');
module.exports = knexFile;

//** migration commands **//
// knex migrate:make <migration_name>
// knex migrate:latest
// knex migrate:rollback

//** seed commands **//
// knex seed:make <seed_name>
// knex seed:run