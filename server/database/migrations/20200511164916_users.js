
exports.up = function(knex) {

	return knex.schema
		.createTable("users", function(user) {
			user.string("id")
				.unique()
				.notNullable()
				.primary();
			user.string("firstName")
				.notNullable();
			user.string("lastName")
				.notNullable();
			user.string("email")
				.unique()
				.notNullable();
			user.string("password")
				.notNullable();
		});
  
}

exports.down = function(knex) {
	return knex.schema.dropTableIfExists("users"); 
}
