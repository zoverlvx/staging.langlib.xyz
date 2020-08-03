// Make sure there's a filename on the commandline
if (process.argv.length < 3) {
	console.log("Usage: node " + process.argv[1] + " " + process.argv[2]);
	process.exit(1);
}

// Read the file and print its contents
const fs = require("fs");
const filename = process.argv[2];
const format = {
	original: "",
	translation: "",
	partOfSpeech: ""
};

fs.readFile(filename, "utf8", function (err, data) {
	if (err) throw err;
	const dataSet = data.split(" ")
		.map(word => ({...format, word}));
	
	
	fs.writeFile(
		"./data.txt", 
		JSON.stringify(dataSet),
		function(err) {
			if (err) throw err;
			console.log("File data.txt has been written to.");
	})
});
