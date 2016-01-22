/*eslint camelcase:0 strict:0*/
'use strict';

exports.up = function(knex, Promise) {
	//add current_reading and reading_at columns to store current temps in the sensor table
	return knex.schema.table('sensor', function(table) {
		table.decimal('current_reading', 5, 2);
		table.timestamp('reading_at');
	});
};

exports.down = function(knex, Promise) {
	//check if current_reading column exists
  	knex.schema.hasColumn('sensor', 'current_reading').then(function(exists) {
  		if(!exists) {
  			//remove current_reading column
			return knex.schema.table('sensor', function(table) {
				table.dropColumn('current_reading');
			});
  		}else{
  			return;
  		}
  	}).then(function() {
		knex.schema.hasColumn('sensor', 'reading_at').then(function(exists) {
			if(!exists) {
				//remove reading_at column
			return knex.schema.table('sensor', function(table) {
				table.dropColumn('reading_at');
			});
			}else{
				return;
			}
  		});
  	})
};
