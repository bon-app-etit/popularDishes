var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/seedDB", { useUnifiedTopology: true, useNewUrlParser: true });
// mongoose.connect("mongodb://localhost/popularfood", { useNewUrlParser: true });

var db = mongoose.connection;

// var seeding = restaurantData => {
//   Restaurants.insertMany(restaurantData, function(error, docs) {
//     if (error) {
//       // console.log(error);
//     } else {
//       // console.log(docs);
//     }
//   });
// };

var RestaurantSchema = new mongoose.Schema({
  restaurantname: String,
  popularDishes: Array
});

var ReviewSchema = new mongoose.Schema({
  reviewId: Number,
  userReview: String,
  userReviewDate: Date,
  userReviewRating: Number,
  userId: Number,
  dishId: Number,
  restaurantId: Number
});

var UserSchema = new mongoose.Schema({
  userId: Number,
  username: String,
  usernamePhotoURL: String,
  userFriendsCount: Number,
  userReviewsCount: Number
});

var Restaurants = mongoose.model("Restaurants", RestaurantSchema);
var Reviews = mongoose.model("Reviews", ReviewSchema);
var Users = mongoose.model("Users", UserSchema);

var queryRestaurant = async (params, callback) => {
    try {
      let rest = await Restaurants.find({restaurantId: Number(params)}).limit(1);
      let popularDishesArr = rest[0].popularDishes;
      var popularDishesReturn = [];
  
      for (let i = 0; i < popularDishesArr.length; i++) {
        // get reviewId array so that we can query review table
        let currentDish = popularDishesArr[i];
        let reviews = await Reviews.find({
          dishId: currentDish.dishId
        }).limit(8);
        
        // here we have the review list for the dish,
        // now we need to get the user with userId in the review
        // list.
        let tempPopularDishObj = {};
        tempPopularDishObj.dishInfo = currentDish;
        let users = [];
  
        let currentUser;
        for (let i = 0; i < reviews.length; i++) {
          currentUser = await Users.find({
            userId: reviews[i].userId
          }).limit(1);

          users.push(currentUser[0]);
        } 
        tempPopularDishObj.users = users;
        tempPopularDishObj.reviews = reviews;
        popularDishesReturn.push(tempPopularDishObj);
      }
    } catch (err) {
      console.log("Error Reading DB", err);
      callback(err);
    }
  
    //console.log("popularDishesReturn", popularDishesReturn);
    callback(null, popularDishesReturn);
  };

var insertReview = async(params, callback) => {

  var stat = await Reviews.collection.insertOne(params);
  if(stat.insertedCount === 0) {
    callback('error')
  } else {
    callback(null)
  } 
};

var deleteReview = async(params, callback) => {

  var stat = await Reviews.deleteOne({"reviewId" : Number(params)} );
  console.log("count delete:", stat);
  if(stat.deletedCount === 0) {
    callback('error')
  } else {
    callback(null)
  }
}

var updateReview = async(params, callback) => {
  console.log('params ', params);

  var stat = await Reviews.update({"reviewId": Number(params.reviewId)}, 
          {$set : params.reviewUpdate});

  if(stat.nModified === 0) {
    callback('error')
  } else {
    callback(null)
  }
}

// var query = (callback) => {
//     Restaurants.find(function (err, docs) {
//         if (err) {
//             callback(err);
//         } else {
//             callback(null, docs);
//         }
//     })
// };

module.exports.updateReview = updateReview;
module.exports.queryRestaurant = queryRestaurant;
module.exports.insertReview = insertReview;
module.exports.deleteReview = deleteReview;
// module.exports.query = query;
