exports.seed = function(knex, Promise) {

	var tblName = 'sensor_type';
	var rows = [
		{ name: 'Local', created_at: new Date(), updated_at: new Date() }, //id = 1
		{ name: 'External', created_at: new Date(), updated_at: new Date() } //id = 2
	];

	return knex(tblName)
		.del()
		.then(function() {
			return knex.insert(rows).into(tblName);
		}
	);
};