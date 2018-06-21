
// scraper tools:
/****************/
// scrapes the html
const cheerio = require( "cheerio" );

// for getting HTML from URLs
const request = require ( "request" );

module.exports = function(app) {
  // index route renders main and scrapes headlines
  // "get"" api route to render index page
  app.get("/", function(req,res){

 // get some poppin' fresh html form the passed in market index
  request("https://news.ycombinator.com/", function (error, response, html){

    // set up our jquery-like $ function for cheerio selecting on our html
    var $ = cheerio.load(html);
  
    // we need a box in which to put our articles objects
    var articleArr = [];
    $(".title").each(function(index,element){
      // push {headline, link, summary} object to articleArr array
      var headline = $(this).children("a").text();
        console.log(headline);
      var summary = $(this).children("a").attr("href");
        console.log(summary);
      articleArr.push({headline:  headline, summary: summary });
      console.log(articleArr);
        console.log("Hello");
    });
    res.render("index",{articles:articleArr});
  })
});


};