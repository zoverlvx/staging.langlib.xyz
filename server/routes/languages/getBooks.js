module.exports = function(req, res) {

	const books = {
		"german": [
			{
				name: "The Earthquake in Chile",
				nativeName: "Das Erdbeben in Chili"
			}
		],
		"french": [],
		"italian": [],
		"spanish": [],
		"dutch": [],
		"russian": [], 
		"portuguese": []
	};
	
	const chosenBooks = books[req.params.language];

	res.status(200).json({
		books: chosenBooks
	});
}
