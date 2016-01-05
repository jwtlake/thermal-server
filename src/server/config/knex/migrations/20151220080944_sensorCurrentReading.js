/*eslint camelcase:0 strict:0*/
'use strict';

exports.up = function(knex, Promise) {
	//add current reading column
	return knex.schema.table('sensor', function(table) {
		table.decimal('current_reading', 5, 2);
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
  	});
};
