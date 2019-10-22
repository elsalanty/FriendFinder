var path = require("path");

// Basic route that sends the user first to the AJAX Page

module.exports = function(app) {
  //home page route
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/home.html"));
  });

  //survey page route
  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/survey.html"));
  });
};
