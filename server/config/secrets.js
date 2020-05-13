module.exports = {
	jwtSecret: process.env.JWT_SECRET || "my_secret",
	environment: process.env.NODE_ENV,
	dbEnvironment: process.env.DB_ENV || "development" 
}
