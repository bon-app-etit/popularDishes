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