const jwt = require("jsonwebtoken");
const secrets = require("./secrets.js");

module.exports = function(user) {
	const payload = {
		subject: user.id,
		username: user.email
	};

	const options = {
		expiresIn: "1d"
	};

	return jwt.sign(payload, secrets.jwtSecret, options);
}
