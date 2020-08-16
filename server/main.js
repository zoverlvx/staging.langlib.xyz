const server = require("express")();
const configureServer = require("./config/configureServer.js");

// Configures middlewares for server
configureServer(server);

// Routes
const auth = require("./routes/auth");
const languages = require("./routes/languages");

server.use("/api/auth", auth);
server.use("/api/languages", languages);

server.get("/", function (req, res) {
	res.status(200).json({
		message: "Langlib node server is on."
	});
});

module.exports = server;
