const bcrypt = require("bcryptjs");
const password = bcrypt.hashSync("password", 14);

exports.seed = function(knex) {
	// if using development or staging db env
	if (
		process.env.DB_ENV === "development" 
		|| process.env.DB_ENV === "staging"
	) {
		// Deletes ALL existing entries
		return knex("users").del()
			.then(function () {
				// Inserts seed entries
				return knex("users").insert([
					{
						id: "unique",
						firstName: "user",
						lastName: "O'Langlib",
						email: "user@langlib.com",
						password: password
					}
				]);
			});	
	// if using production db env
	} else if (
		process.env.DB_ENV === "production" 
	) {
		return knex("users").del()
			.then(function () {
				// Inserts seed entries
				return knex("users").insert([
					{
						id: "unique",
						firstName: "user",
						lastName: "O'Langlib",
						email: "user@langlib.com",
						password: password
					}
				]);
			});
	}
}
