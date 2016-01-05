exports.seed = function(knex, Promise) {

	var tblName = 'sensor_type';
	var rows = [
		{ name: 'Local' }, //id = 1
		{ name: 'External' } //id = 2
	];

	return knex(tblName)
		.del()
		.then(function() {
			return knex.insert(rows).into(tblName);
		}
	);
};