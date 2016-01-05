exports.seed = function(knex, Promise) {

	var tblName = 'sensor';
	var rows = [
		{ name: 'Living Room', sensor_type_id: 1, api_key: '72f18b5f6f63b572e58c48d19c957b51' },
		{ name: 'Lake Oswego', sensor_type_id: 2, api_key: '72f18b5f6f63b572e58c48d19c957b52' }
	];

	return knex(tblName)
		.del()
		.then(function() {
			return knex.insert(rows).into(tblName);
		}
	);
};