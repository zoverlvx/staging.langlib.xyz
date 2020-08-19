const book = require("../../practice-data/books/dasErdbebenInChili/");

module.exports = function(req, res) {

	const data = {
		"german": {
			"the-earthquake-in-chile": book
		},
		"french": {},
		"italian": {},
		"spanish": {},
		"dutch": {},
		"russian": {}, 
		"portuguese": {}
	};
	
	const response = data[req.params.language][req.params.book];

	if (!response) {
		res.status(400).json({
			message: "Path doesn't exist"
		});
	}
	
	res.status(200).json({
		book: response
	});
}
