const router = require("express").Router();
const login = require("./login.js");
const register = require("./register.js");

router.post("/login", login);
router.post("/register", register);

module.exports = router;
