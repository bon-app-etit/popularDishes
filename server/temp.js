// Dont touch here


const express = require("express");

const path = require("path");

const db = require("./db.js");

const compression = require("compression");

const app = express();

const PORT = 3001;

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
    
  // req.body
  //  - restaurant id

  // return: all reviews

  // in restaurants table:
    // read restaurants name and Id (READ)

  // in dishes table:
    // read all Popular Dishes that matched restaurantId (READ)

  var params = req.body.id; // body has restaurantId
  db.query(params, (err, results) => {
    if (err) {
      res.status(500);
      res.end(err);
    } else {
      res.end(JSON.stringify(results));
    }
  });
});


app.post("/restaurants/:id/review", function(req, res) {
  var params = req.query; // body has restaurantId

  // define the rest. detail
  // req.body
  //  - restaurant id :
  //  - dish id:
  //  - text ( review text )
  //  - date
  //  - starRating
  //  - reviewerId

  // return: nothing

  // in reviews table:
    // add new review record (CREATE)

  // in user table: done in db.index
    // increment numberOfReviews (UPDATE)

  // in dishes tables: done in db.index
    // increment numberOfReviews (UPDATE)

  db.insertReview(params, err => {
    if (err) {
      // res.status(500);
      // res.end(err);
      console.log("err: insertReview");
    } else {
      console.log("success: insertReview");
      res.sendStatus(200);
    }
  });
});

app.delete("/review/:id", function(req, res) {
  var params = req.query; // body has restaurantId

  // define the rest. detail
  // req.body
  //  - reviewerId
  //  - ReviewItemId

  // return: nothing

  // in reviews table:
    // delete new review record (DELETE)

  // in user table:
    // decrement numberOfReviews (UPDATE)

  // in dishes tables:
    // decrement numberOfReviews (UPDATE)

  db.deleteReview(params, err => {
    if (err) {
      // res.status(500);
      // res.end(err);
      console.log("err: deleteReview");
    } else {
      console.log("success: deleteReview");
      res.sendStatus(200);
    }
  });

  app.patch("/review/:id", function(req, res) {
    
    // req.body
    //  - restaurant id :

    // return: nothing
  
    var params = req.body.id; // body has restaurantId
    db.updateReview(params, (err, results) => {
      if (err) {
        res.status(500);
        res.end(err);
      } else {
        res.end(JSON.stringify(results));
      }
    });
  
    // in restaurants table:
      // read restaurants name and Id (READ)
  
    // in dishes table:
      // read all Popular Dishes that matched restaurantId (READ)
  });
});

// Start the server on the provided port
app.listen(PORT, () => console.log("Listening on port: " + PORT));



// -------------------------------------------------------------------
// -------------------------------------------------------------------

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/popularfood', { useNewUrlParser: true });

var db = mongoose.connection;

var seeding = (restaurantData) => {
    Restaurants.insertMany(restaurantData, function (error, docs) {
        if (error) {
            // console.log(error);
        } else {
            // console.log(docs);
        }
    })
}

var RestaurantSchema = new mongoose.Schema({
    restaurantname: String,
    popularDishes: Array
});

var Restaurants = mongoose.model('Restaurants', RestaurantSchema);

var query = (callback) => {
    Restaurants.find(function (err, docs) {
        if (err) {
            callback(err);
        } else {
            callback(null, docs);
        }
    })
};

//=====
var insertReview = (params, callback) => {
    // todo for postgres
  
    // insertReview
  
    // in user table:
        // increment numberOfReviews (UPDATE)
  
    // in dishes tables:
        // increment numberOfReviews (UPDATE)
  
    //  dummy return for now
    callback(null);
  };
  
  var deleteReview = (params, callback) => {
    // todo for postgres
  
    // in reviews table:
        // delete new review record (DELETE)
  
    // in user table:
        // decrement numberOfReviews (UPDATE)
  
    // in dishes tables:
        // decrement numberOfReviews (UPDATE)

  
    //  dummy return for now
    callback(null);
  };
  //=====

module.exports.query = query;
module.exports.seeding = seeding;

