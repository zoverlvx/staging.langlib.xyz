// function for registrating the user
const validator = require("validator");
const bcrypt = require("bcryptjs");
const {v4: uuidv4 }= require("uuid");

// Model
const Users = require("../../models")("users");

// Configuration
const generateToken = require("../../config/generateToken.js");

module.exports = function(req, res) {
	
	const firstName = 
		// if first name is a string
		typeof(req.body.firstName) === "string"
		// and if first name is greater or equal to one character
		&& req.body.firstName.trim().length >= 1
			// then trim any space from the front and back
			? req.body.firstName.trim()
			// otherwise use a false boolean for rejection
			: false;

	const lastName =
		// if last name is a string
		typeof(req.body.lastName) === "string"
		// and if last name is greater or equal to one character
		&& req.body.lastName.trim().length >= 1
			// then trim any space from the front and back
			? req.body.lastName.trim()
			// otherwise use a false boolean for rejection
			: false;

	const email =
		// if email is a string
		typeof(req.body.email) === "string"
		// and if it's not an empty string
		&& req.body.email.trim().length >= 1
			// then trim any space from the front and back
			? req.body.email.trim() 
			// otherwise use a false boolean for rejection
			: false;

	const password = 
		// if password is a string
		typeof(req.body.password) === "string"
		// and if it's not an empty string
		&& req.body.password.trim().length >= 1
			// then trim any space from the front and back
			? req.body.password.trim()
			// otherwise use a false boolean for rejection
			: false;

	// if all data types are correct and meet standards
	if (
		firstName
		&& lastName
		&& email
		&& password
	) {
		const passwordLength = password.length;
		const correctFormat = validator.isEmail(email);

		// if valid email format 
		// and the password is the correct length
		if (
			correctFormat
			&& passwordLength >= 8
			&& passwordLength <= 16
		) {
			// credentials will be added to the database
			const credentials = {
				email
			};

			// set password to a hashed password
			credentials.password = bcrypt.hashSync(password, 14);

			// normalize names
			credentials.firstName =
				firstName.charAt(0).toUpperCase()
				+ firstName.substr(1).toLowerCase();
			credentials.lastName =
				lastName.charAt(0).toUpperCase()
				+ lastName.substr(1).toLowerCase();
			
			// assign uuid
			credentials.id = uuidv4();

			// add user to database
			Users.add(credentials)
				.then(function(user) {

					// if nothing goes wrong
					if (user) {
						// delete password before sending response
						delete user.password;

						// generate token
						const token = generateToken(user);

						
						// if a token is generated
						// send response
						if(token) {
							res.status(201).json({
								user,
								token
							});

						// if a token isn't generated
						// send response
						} else if (!token){
							res.status(409).json({
								message: "Token unable to generate due to request made."
							});
						}

					// if a user isn't added
					// send response
					} else if (!user) {
						res.status(404).json({
							message: "User not found."
						});						
					}
				}).catch(function(err) {
					// if the request is bad
					res.status(500).json({
						message: "We couldn't process your registration at the moment."
					});
				});

		// if incorrect email format
		// or if the length of the password is less than 8
		// or if the length of the password is more than 16
		// send specific error based on input
		} else if (
			!correctFormat
			|| passwordLength < 8
			|| passwordLength > 16
		) {
			
			// if incorrect email format
			if (!correctFormat) {
				res.status(400).json({
					message: "Invalid email format."
				});

			// if the password length is incorrect
			} else if (
				passwordLength < 8
				|| passwordLength > 16
			) {
				res.status(400).json({
					message: "Password must be between 8 and up to 16 characters."
				});
			}
		}

	// if any incoming request properties didn't meet up to standards
	} else {
		res.status(400).json({
			message: "Invalid credentials."
		});
	}	
}
