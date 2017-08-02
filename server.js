// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static(__dirname + '/public'));

// bring in api routes - bring in api routes first because
// that's where we're getting our data to display in html pages
require("./app/routing/apiRoutes.js")(app);

// bring in the html routes
require("./app/routing/htmlRoutes.js")(app);

// set up the listener
app.listen(PORT, function() {
	console.log("app listening on port", PORT);
});

