module.exports = function(req, res) {
	
	const languages = [
		{
			name: "German",
			nativeName: "Deutsch"
		},
		{
			name: "French",
			nativeName: "Français"
		},
		{
			name: "Spanish",
			nativeName: "Español"
		},
		{
			name: "Italian",
			nativeName: "Italiano"
		},
		{
			name: "Portuguese",
			nativeName: "Português"
		},
		{
			name: "Russian",
			nativeName: "Русский"
		},
		{
			name: "Dutch",
			nativeName: "Nederlands"
		}
	];
	
	res.status(200).json({
		languages
	});
}
