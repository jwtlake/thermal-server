exports.seed = function(knex, Promise) {

	var tblName = 'reading';
	var rows = [
		{ id: 1, sensor_id: 1, temperature: 0.00, created_at: new Date(), updated_at: new Date(), reading_at: new Date() },
		{ id: 2, sensor_id: 2, temperature: 0.00, created_at: new Date(), updated_at: new Date(), reading_at: new Date() }
	];

	return knex(tblName)
		.del()
		.then(function() {
			return knex.insert(rows).into(tblName);
		}
	);
};