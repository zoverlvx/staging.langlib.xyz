const validator = require("validator");
const bcrypt = require("bcryptjs");

// Model
const Users = require("../../models")("users");

// Configuration
const generateToken = require("../../config/generateToken.js");

module.exports = function (req, res) {

	// checks that email is data type string
	// and that the length is at least one char
	const email = 
		typeof(req.body.email) === "string"
		&& req.body.email.trim().length >= 1
			? req.body.email.trim()
			: false;

	// checks that the password is data type string
	// and that the length is at least one char
	const password =
		typeof(req.body.password) === "string"
		&& req.body.password.trim().length >= 1
			? req.body.password.trim()
			: false;

	// if request properties pass the standard
	if (email && password) {
		// passwordLength: number
		const passwordLength = password.length;
		// correctFormat: boolean
		const correctFormat = validator.isEmail(email);
	
		// check for correct email format
		// and check correct password length
		if (
			correctFormat
			&& passwordLength >= 8
			&& passwordLength <= 16
		) {
			Users.findBy({ email })
				.then(function(user) {
					const correctPassword = bcrypt.compareSync(
						password,
						user.password	
					);
					
					// if correct user and password
					if (user && correctPassword) {
					
						// remove the password 
						// before sending response
						delete user.password;
						
						// generate token
						const token = generateToken(user);
						
						// if the token is generated
						if (token) {
						
							// send response
							res.status(200).json({
								user,
								token
							});
						// if the token isn't generated
						} else if (!token) {
							res.status(409).json({
								message: "Token unable to generate due to request made."
							});
						}
				
					// if incorrect user or password
					} else if (!user || !correctPassword) {
						res.status(400).json({
							message: "Incorrect email or password."
						});
					}
				}).catch(function (err) {
					res.status(500).json({
						message: "We couldn't process your login at the moment."
					});
				});
		
		// if incorrect email format
		// or if the length is incorrect
		// send specific response
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
				return;
			} else if (
				passwordLength < 8
				|| passwordLength > 16
			) {
				res.status(400).json({
					message: "Password must be between 8 and up to 16 characters."
				});
			}
		}

	// if the incorrect data types are received
	} else if (
		!email || !password
	) {
		// invalid credentials
		res.status(400).json({
			message: "Invalid credentials"
		});
	}
}
