const router = require("express").Router();
const login = require("./login.js");
const register = require("./register.js");

const Users = require("../../models")("users");

router.post("/login", login);
router.post("/register", register);

module.exports = router;
