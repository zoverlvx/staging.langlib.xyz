const router = require("express").Router();
const getLanguages = require("./getLanguages");
const getBooks = require("./getBooks");
const getBook = require("./getBook.js");

router.get("/", getLanguages);
router.get("/:language", getBooks);
router.get("/:language/:book", getBook);

module.exports = router;
