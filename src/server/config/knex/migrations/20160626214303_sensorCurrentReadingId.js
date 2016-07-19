/*eslint camelcase:0 strict:0*/
'use strict';

//Summary: No longer storing current reading as a temperature value in the Sensor table, instead using current reading ID.
exports.up = function(knex, Promise) {	
	
	//add current_reading_id 
	return knex.schema.table('sensor', function(table) {
		table.integer('current_reading_id')
			.references('id')
			.inTable('reading');
	}).then(function(){
		
		//remote current_reading
		return knex.schema.hasColumn('sensor', 'current_reading').then(function(exists) {
			if(exists) {
				//remove current_reading column
				return knex.schema.table('sensor', function(table) {
					table.dropColumn('current_reading');
				});
			}else{
				return;
			}
		});
	})
};

exports.down = function(knex, Promise) {

	//check if exists
	return knex.schema.hasColumn('sensor', 'current_reading').then(function(exists) {
		if(!exists) {
			//add current_reading column
			return knex.schema.table('sensor', function(table) {
				table.decimal('current_reading', 5, 2);
			});
		}else{
			return;
		}
	}).then(function(){

		//check if exists
		return knex.schema.hasColumn('sensor', 'current_reading_id').then(function(exists) {
			if(exists) {
				//remove current_reading_id column
				return knex.schema.table('sensor', function(table) {
					table.dropColumn('current_reading_id');
				});
			}else{
				return;
			}
		});
	})
};
