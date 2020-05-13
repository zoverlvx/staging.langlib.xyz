const bcrypt = require("bcryptjs");
const password = bcrypt.hashSync("password", 14);
const secrets = require("../../config/secrets.js");
const {dbEnvironment} = secrets;

exports.seed = function(knex) {
	// if using development or staging db env
	if (
		dbEnvironment === "development" 
		|| dbEnvironment === "staging"
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
		dbEnvironment === "production" 
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
