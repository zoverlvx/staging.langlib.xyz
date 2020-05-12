const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

module.exports = function(server) {
	server.use(cors());
	server.use(helmet());
	server.use(cookieParser());
	server.use(express.json());
	server.use(express.urlencoded({extended: false}));
}
