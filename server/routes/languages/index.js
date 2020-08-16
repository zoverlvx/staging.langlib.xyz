const router = require("express").Router();
const getLanguages = require("./getLanguages");
const getBooks = require("./getBooks");

router.get("/", getLanguages);
router.get("/:language", getBooks);

module.exports = router;
