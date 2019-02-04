// Setup
// -----------------------------------------------------------------------------
// #############################################################################
const express = require("express");

const app = express();

app.listen(5555, () => {
  console.log("SERVER is ready! 🌮");
});

app.use(express.static(__dirname + "/public"));

app.set("view engine", "hbs");

// Routes
// -----------------------------------------------------------------------------
// #############################################################################

// form page for the SEARCH feature
app.get("/", (request, response, next) => {
  response.render("index.hbs");
});

// results page for the SEARCH feature (this route will have a QUERY STRING)
app.get("/results", (request, response, next) => {
  // request.query is how you access the QUERY STRING from your route
  // request.query = {"search_query":"hello"}
  // response.send(request.query);

  // use destructuring to get search_query from INSIDE of request.query
  const { search_query } = request.query;
  let icon = "";

  if (search_query === "pizza") {
    icon = "🍕";
  } else if (search_query === "burger") {
    icon = "🍔";
  }

  response.locals.emoji = icon;
  response.locals.userText = search_query;
  response.render("search-results.hbs");
});

// Fake YouTube watch a video page
// https://www.youtube.com/watch?v=sv3TXMSv6Lw
app.get("/watch", (request, response, next) => {
  // request.query is how you access the QUERY STRING from your route
  // request.query = {"v":"sv3TXMSv6Lw"}
  // response.send(request.query);

  // use destructuring to get v from INSIDE of request.query
  const { v } = request.query;

  // if we had a database we would do this
  // Video.findById(v).then().catch();

  response.locals.videoId = v;
  response.render("youtube-video.hbs");
});

// Fake Netflix watch a video page
// https://www.netflix.com/watch/80018191
app.get("/watch/:netflixId", (request, response, next) => {
  // request.params is how you access information in the PATH/URL of you route
  // request.params = {"netflixId":"80018191"}
  // response.send(request.params);

  const { netflixId } = request.params;

  // if we had a database we would do this
  // Video.findById(netflixId).then().catch();

  response.locals.netflixVideoId = netflixId;
  response.render("netflix-video.hbs");
});
