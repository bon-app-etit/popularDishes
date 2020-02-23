const path = require("path");
const axios = require("axios");

const id = '1';
const reviewId = '10000005';
const patchId = '10000005'
var review = {
  reviewId: 10000005,
  userReview: "Hello World",
  userReviewDate: "11/19/2019",
  userReviewRating: 5,
  userId: 2,
  dishId: 5,
  restaurantId: 1
};

var updateReview = {
  userReview: "Goodbye World",
};

// GET
// axios
//   .get(`http://localhost:3001/restaurants/${id}`)
//   .then(response => {
//     console.log('responses: ', response.data);
//   })
//   .catch(err => console.log('error'));

// POST
// axios
//   .post(`http://localhost:3001/restaurants/${id}/review`, review)
//   .then(response => {
//     console.log('responses: ', response.data);
//   })
//   .catch(err => console.log('error review'));

// DELETE
// axios
// .delete(`http://localhost:3001/restaurants/${id}/dish/review/${reviewId}`)
// .then(response => {
//   console.log('responses: ', response.data);
// })
// .catch(err => console.log('error delete'));

// PATCH
axios
  .patch(`http://localhost:3001/restaurants/${id}/dish/review/${patchId}`, updateReview)
  .then(response => {
    console.log('responses: ', response.data);
  })
  .catch(err => console.log('error updating'));

