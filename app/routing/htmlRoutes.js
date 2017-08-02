
// require path so we can parse directory structures
var path = require('path');

// define the routes we will be exporting to the server
module.exports = function(app) {

	// the /survey route will take us to survey.html page
	app.get("/survey", function(req, res) {
		res.sendFile(path.join(__dirname + "/../public/survey.html"));
	});

	// the / route will take us to survey.html page
	app.get("/", function(req, res) {
		res.sendFile(path.join(__dirname + "/../public/home.html"));
	});
}
