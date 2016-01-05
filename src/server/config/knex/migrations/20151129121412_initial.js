/*eslint camelcase:0 strict:0*/
'use strict';

exports.up = function(knex) {
	// create sensor type table
	return knex.schema.createTable('sensor_type', function(table) {
		table.increments('id').primary();
		table.string('name').notNull();
		table.timestamps(); //created_at && updated_at
	}).then(function() {
		
		// create sensor table
		return knex.schema.createTable('sensor', function(table) {
			table.increments('id').primary();
			table.string('name').notNull();
			table.integer('sensor_type_id')
				.references('id')
				.inTable('sensor_type')
				.notNull();
			table.string('api_key').notNull();
			table.timestamps(); //created_at and updated_at
		});
	}).then(function() {
		
		// create readings table
		return knex.schema.createTable('reading', function(table) {
			table.bigIncrements('id').primary();
			table.integer('sensor_id')
				.references('id')
				.inTable('sensor')
				.notNull();
			table.decimal('temperature', 5, 2).notNull();
			table.timestamps(); //created_at and updated_at
		});
	});
};

exports.down = function(knex){
	// drop readings table
	return knex.schema
		.dropTableIfExists('reading')
		.dropTableIfExists('sensor')
		.dropTableIfExists('sensor_type');
};