const fs = require("fs");
const path = require("path");
const faker = require("faker");
const loremIpsum = require("lorem-ipsum").loremIpsum;

// var db = mongoose.connection;
//
// var  reviewFileSize = 1000000 ;
var reviewFileSize = 1000000;

// change to 100000  later
const USER_MAX = 100000;
// const USER_MAX = 100;

// change to 4000 later
// var totalRestaurant = 4;
var totalRestaurant = 4000;
var Restaurants = [];
var dish = {};
var dishIdv = 1;
var maxDish = 5;
var totalImageUrl = randomIntFromInterval(3, 6);
// let totalImageUrl = 6;

// REVIEW_MAX [max number per dish]
// change to 500 later
var REVIEW_MAX = 500;
// var REVIEW_MAX = 5;

var reviewFileCount = 1;
const userDirPath = path.join(__dirname, "data/userSeedText.json");
console.log(userDirPath);
const restaDirPath = path.join(__dirname, "data/restaSeedText.json");
var reviewDirPath = path.join(
  __dirname,
  `data/reviewSeedText${reviewFileCount}.json`
);

// the reviewId is from reviews table. Since the table is outside of
// resta table, we need to keep reviewId out of the resta loop.
// all var are with 'v' at end end
var reviewsIdv = 1; // start with 1
var reviews = [];
var reviewsId = []; // this is the reviewsId array inside resta loop

var restaFirst = true;
var reviewFirst = true;
var userFirst = true;

// random number between min and max
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// get description of dish
function description() {
  var photoDescription = loremIpsum({
    count: 1, // Number of "words", "sentences", or "paragraphs"
    format: "plain", // "plain" or "html"
    random: Math.random, // A PRNG function
    sentenceLowerBound: 2, // Min. number of words per sentence.
    sentenceUpperBound: 5, // Max. number of words per sentence.
    suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
    units: "sentence" // paragraph(s), "sentence(s)", or "word(s)"
  });

  if (photoDescription.length > 80) {
    photoDescription = photoDescription.substring(0, 80);
    photoDescription[photoDescription.length - 1] = ".";
  }

  return photoDescription;
}

function userReview() {
  var userReviewdetail = loremIpsum({
    count: 1, // Number of "words", "sentences", or "paragraphs"
    format: "plain", // "plain" or "html"
    paragraphLowerBound: 3, // Min. number of sentences per paragraph.
    paragraphUpperBound: 5, // Max. number of sentences per paragarph.
    random: Math.random, // A PRNG function
    sentenceLowerBound: 5, // Min. number of words per sentence.
    sentenceUpperBound: 8, // Max. number of words per sentence.
    suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
    units: "paragraph" // paragraph(s), "sentence(s)", or "word(s)"
  });

  if (userReviewdetail.length > 255) {
    userReviewdetail = userReviewdetail.substring(0, 255);
    userReviewdetail[userReviewdetail.length - 1] = ".";
  }

  return userReviewdetail;
}

for (var restaurantNum = 1; restaurantNum <= totalRestaurant; restaurantNum++) {
  let Restaurant = {};
  Restaurant.restaurantId = restaurantNum; // might not need
  Restaurant.restaurantName = faker.address.streetName() + " Restaurant";

  let popularDishes = [];
  for (let dishNum = 1; dishNum <= maxDish; dishNum++) {
    dish = {};
    dish.dishId = dishNum; // each restaurant can have their own dishId
    dish.dishName = faker.address.streetName() + " Dish";
    dish.ingredients = loremIpsum();
    dish.coverPictureURL = faker.image.food();
    dish.dishPrice = randomIntFromInterval(20, 45);

    dish.photos = [];

    for (let imageUrl = 1; imageUrl < totalImageUrl; imageUrl++) {
      dish.photos.push({
        URL: faker.image.food(),
        description: description()
      });
    }

    reviews = {}; // this is review item of  reviews table
    reviewsId = []; // this is the reviewsId array inside resta loop

    for (let reviewNum = 1; reviewNum <= REVIEW_MAX; reviewNum++) {
      // select random number for userId  between 1 and userId max.

      // GO BACK HERE
      // dish.DishReviewsIds.push(reviewNum);

      reviews = {
        reviewId: reviewsIdv,
        userReview: userReview(),
        userReviewDate: `${randomIntFromInterval(
          1,
          12
        )}/${randomIntFromInterval(1, 28)}/${randomIntFromInterval(
          2012,
          2019
        )}`,
        userReviewRating: randomIntFromInterval(1, 5),
        userId: randomIntFromInterval(1, USER_MAX),
        dishId: dishIdv,
        restaurantId: restaurantNum
      };

      if (reviewFirst != true) {
        fs.appendFileSync(reviewDirPath, "\n", function(err) {
          if (err) throw err;
        });
      } else reviewFirst = false;

      fs.appendFileSync(reviewDirPath, JSON.stringify(reviews), function(err) {
        if (err) throw err;
      });
      // todo fix append extra line...
      reviewsId.push(reviewsIdv);
      reviewsIdv++;
      if (reviewsIdv % 10000 == 0) console.log("count:", reviewsIdv);
      if (reviewsIdv % reviewFileSize == 0) {
        reviewFileCount++;
        console.log("reviewFileCount:", reviewFileCount);
        reviewDirPath = path.join(
          __dirname,
          `data/reviewSeedText${reviewFileCount}.json`
        );
        reviewFirst = true; // this is to avoid \n at top of file
      }
    }

    // write to dish
    dish.reviewsId = reviewsId;
    //..
    //.. populate rest of dish items
    //
    popularDishes.push(dish);
    dishIdv++;
  }
  Restaurant.popularDishes = popularDishes;
  // note: at this point everything in rest must be filled out
  // write to rest file

  if (restaFirst !== true) {
    fs.appendFileSync(restaDirPath, "\n", function(err) {
      if (err) throw err;
    });
  } else restaFirst = false;

  fs.appendFileSync(restaDirPath, JSON.stringify(Restaurant), function(err) {
    if (err) throw err;
  });
  if (restaurantNum % 50 == 0) {
    console.log("restaurantNum:", restaurantNum);
  }
}
console.log("dishIdv, reviewsIdv:", dishIdv, reviewsIdv);

// user table
// remember to change to 100000
// const USER_MAX = 10;

//
// review.username = userName[randomIntFromInterval(0, userName.length)];
// review.usernamePhotoURL = formatUsernamePhotoURL();
// review.userReview = reviewDetail[randomIntFromInterval(0, reviewDetail.length -1)];
// review.userReviewDate = `${randomIntFromInterval(1,12)}/${randomIntFromInterval(1,28)}/${randomIntFromInterval(2012,2019)}`;
// review.userReviewRating = randomIntFromInterval(0,5);
// review.userFriendsCount = randomIntFromInterval(0,500);
// review.userReviewsCount = randomIntFromInterval(0,200);
//
for (var userId = 1; userId <= USER_MAX; userId++) {
  let userName =
    faker.name.firstName() +
    " " +
    String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
    ".";
  let userFriendsCount = randomIntFromInterval(0, 500);
  let avatarPhoto = faker.image.people();
  let userReviewsCount = randomIntFromInterval(0, 200);

  var user = {};
  user.userId = userId;
  user.username = userName;
  user.usernamePhotoURL = avatarPhoto;
  user.userFriendsCount = userFriendsCount;
  user.userReviewsCount = userReviewsCount;
  if (userFirst !== true) {
    fs.appendFileSync(userDirPath, "\n", function(err) {
      if (err) throw err;
    });
  } else userFirst = false;

  fs.appendFileSync(userDirPath, JSON.stringify(review), function(err) {
    if (err) throw err;
  });
}

console.log(" exit...");
