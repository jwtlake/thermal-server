'use strict';

var settings = require('./src/server/config/settings');

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: settings.get('postgres:host'),
      database: settings.get('postgres:database'),
      user: settings.get('postgres:user'),
      password: settings.get('postgres:password')
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/server/config/knex/migrations'
    },
    seeds: {
      tableName: 'knex_seeds',
      directory: './src/server/config/knex/seeds'
    }
  }
};