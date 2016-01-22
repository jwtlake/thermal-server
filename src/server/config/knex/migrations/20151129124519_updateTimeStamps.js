/*eslint camelcase:0 strict:0*/
'use strict';

exports.up = function(knex) {
	//add reading_at datetime column to store the actual time the reading was taken
	return knex.schema.table('reading', function(table) {
		table.timestamp('reading_at');
	});
};

exports.down = function(knex) {	
	//check if reading_at column exists
  	knex.schema.hasColumn('reading', 'reading_at').then(function(exists) {
  		if(!exists) {
  			//remove reading_at column
			return knex.schema.table('reading', function(table) {
				table.dropColumn('reading_at');
			});
  		}else{
  			return;
  		}
  	});
};
