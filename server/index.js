const express = require("express");

// Middleware
var morgan = require('morgan');
var parser = require('body-parser');
const path = require("path");

const db = require("./db.js");

const compression = require("compression");

const app = express();

const PORT = 3001;

// Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());

app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(compression());

// Uncomment if you want to serve the bundle locally instead of S3
app.get("/bundle.js", function(req, res) {
  res.sendFile("../client/bundle.js", function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Sent: bundle.js");
    }
  });
});

app.get("/restaurants/:id", function(req, res) {

  // console.log('this was called');
  // console.log('req params', req.params.id);
  // res.sendStatus(200);
    

  // return: all reviews

  // in restaurants table:
    // read restaurants name and Id (READ)

  // in dishes table:
    // read all Popular Dishes that matched restaurantId (READ)

  var params = req.params.id; // body has restaurantId
  db.queryRestaurant(params, (err, results) => {
    if (err) {
      console.log('Error in getting popular Dish')
      res.sendStatus(404);
    } else {
      console.log("success: getting Popular Dish");
      res.json(results);
    }
  });
});

app.post("/restaurants/:id/review", function(req, res) {

  //console.log('req.body ', req.body);
  let review = req.body;

  // in reviews table:
    // add new review record (CREATE)

  // in user table: done in db.index
    // increment numberOfReviews (UPDATE)

  // in dishes tables: done in db.index
    // increment numberOfReviews (UPDATE)

  db.insertReview(review, err => {
    if (err) {
      console.log('Error in adding popular Dish')
      res.sendStatus(404);
    } else {
      console.log("success: inserting Review");
      res.sendStatus(200);
    }
  });
});

app.delete("/restaurants/:id/dish/review/:id", function(req, res) {

  let reviewId = req.params.id;
  console.log('here')
  console.log(reviewId);

  db.deleteReview(reviewId, err => {
    if (err) {
      console.log('Error in deleting review or review doesn\'t exist')
      res.sendStatus(404);
    } else {
      console.log("success: deleting Review");
      res.sendStatus(200);
    }
  });

});

app.patch("/restaurants/:id/dish/review/:id", function(req, res) {

  // console.log('req params id ', req.params.id);
  // console.log('req.body ', req.body);
  let params = {
    reviewId: req.params.id,
    reviewUpdate: req.body
  }

  console.log('params, ', params);

  db.updateReview(params, err => {
    if (err) {
      console.log('Error in updating Review or no reviews to update')
      res.sendStatus(404);
    } else {
      console.log("success: update Review");
      res.sendStatus(200);
    }
  });
});

// Start the server on the provided port
app.listen(PORT, () => console.log("Listening on port: " + PORT));