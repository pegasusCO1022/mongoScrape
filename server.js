const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");

var app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

// Make public a static dir
app.use(express.static(process.cwd() + "/public"));


// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
// db set up
const mongoose = require("mongoose");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;


// local or deployed? Use the right mongo db
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/mongoscraper" );

var db = mongoose.connection;

db.on("error", function (error) {
    console.log("Mongoose Error: ", error);
});

db.once("open", function () {
    console.log("Mongoose connection successful.");
});

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));


// Configure Handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// get routes here
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);


//set port
var port = process.env.PORT || 8000;

//setup listener
app.listen(port, function() {
  console.log("app running on port " + port);
});