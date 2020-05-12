const server = require("express")();
const configureServer = require("./config/configureServer.js");

// Configures middlewares for server
configureServer(server);

// Routes
const auth = require("./routes/auth");

server.use("/api/auth", auth);

server.get("/", function (req, res) {
	res.status(200).json({
		message: "Langlib node server is on."
	});
});

module.exports = server;
