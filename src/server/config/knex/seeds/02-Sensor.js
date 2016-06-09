exports.seed = function(knex, Promise) {

	var tblName = 'sensor';
	var rows = [
		{ name: 'Living Room', sensor_type_id: 1, api_key: '72f18b5f6f63b572e58c48d19c957b51', created_at: new Date(), updated_at: new Date(), current_reading: 0.00, reading_at: new Date() },
		{ name: 'Lake Oswego', sensor_type_id: 2, api_key: '72f18b5f6f63b572e58c48d19c957b52', created_at: new Date(), updated_at: new Date(), current_reading: 0.00, reading_at: new Date() }
	];

	return knex(tblName)
		.del()
		.then(function() {
			return knex.insert(rows).into(tblName);
		}
	);
};