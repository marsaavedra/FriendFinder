// require path so we can parse directory structures
var path = require('path');

// pull in the friends variable data file
var friends = require('../data/friends.js');

module.exports = function(app) {

	// if user goes to /api/friends, send them the variable data as json
	app.get("/api/friends", function(req, res) {
		res.json(friends);
	});

	// handle the post request from the survey form
	app.post("/api/friends", function(req, res) {
		
		// begin by setting up the array holding the user's answers
		var surveyResults = req.body.scores;
		// convert the values in surveyResults to integers
		for (var i=0; i<surveyResults.length; i++) {
			surveyResults[i] = parseInt(surveyResults[i]);
		}

		
		var bestDifference = 10000; 
		var bestMatch = 0; // assume the first sith is the best match then adjust later

		// cycle through the friends array 
		for (var i=0; i<friends.length; i++) {

			
			var tempDifference = difference(surveyResults, friends[i].scores);

			// console log the difference between user choices and sith being compared
			console.log("difference between", surveyResults, "and", friends[i].name, friends[i].scores, "=", tempDifference);


			if (tempDifference < bestDifference) {
				bestDifference = tempDifference;
				bestMatch = i;
			}
		}

		
		function difference(array1, array2) {

			// differenceAmount holds the tally of the difference between array values
			var differenceAmount=0;
			
			for (var i=0; i<array1.length; i++) {
				differenceAmount += Math.abs(array1[i] - array2[i]);
			}
			
			// return the difference between the two arrays reflecting the deviation
			return differenceAmount;
		}

		// send the bestMatch back to the html page in response to the post
		res.send(friends[bestMatch]);
	});
}
