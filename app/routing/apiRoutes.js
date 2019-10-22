//routes are url-handling code that streamline requests and responses between the front and backend
//handler functions control the routes
//foutes forward the http request to appropriate controller. express.router class is used to create modular route handlers
//controller read and write data from database through models and render an http response

var friends = require("../data/friends");

module.exports = function(app) {
  // Displays all friends:
  app.get("/api/friends", function(req, res) {
    return res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    //creating a best match based on the survey results

    //a variable to hold the best match information and set the maximum difference we can have
    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: 100
    };

    //which data you need from that match's results
    var userData = req.body;
    //var userName = userData.name;
    var userScores = userData.scores;
    var totalDifference = 0;

    //here's where the action takes place
    //for loop to compare the user's survey results to those of others on the friends list
    for (var i = 0; i < friends.length; i++) {
      console.log(friends[i].name);
      totalDifference = 0;

      for (var j = 0; j < friends[i].scores[j]; j++) {
        //total difference between user and each friend = totalDifference value, which starts at 0 + the absolute difference (without - sign) between the score of the user on each question and the score of each friend on each question in the survey
        totalDifference += Math.abs(
          parseInt(userScores[j]) - parseInt(friends[i].scores[j])
        );

        //now, if the difference we get is "acceptable", meaning it's less to the value we give in the bestMatch object above, then add the name of that lucky pick to the best match object
        if (totalDifference <= bestMatch.friendDifference) {
          bestMatch.name = friends[i].name;
          bestMatch.friendDifference = totalDifference;
        }
      }
    }
    //don't forget to push this new user to the friends list page and retrieve the best match object
    friends.push(userData);
    res.json(bestMatch);
  });
};
