const { Pool, Client } = require("pg");
const path = require("path");

const client = new Client({
  user: "caseynguyen",
  host: "localhost",
  database: "test2"
});

client.connect();

// CREATE TABLE "DishReviews" (
// 	"ReviewId" serial NOT NULL,
// 	"DishId" int NOT NULL,
// 	"UserReviewdetail" varchar(255) NOT NULL,
// 	"UserReviewRating" int NOT NULL,
// 	"UserReviewDate" DATE NOT NULL,
// 	"UserID" int NOT NULL,

const dirPath = path.join(
  __dirname,
  "../preSeedPostgres/data/restaurantName.txt"
);

var dirPath = path.join(__dirname, "../preSeedPostgres/data/reviews.txt");
console.log(dirPath);
//dirPath = '/Users/caseynguyen/Desktop/Bon-App-Etit/tryPost/preSeed/popularDishes.txt';
const q = `COPY "DishReviews" ("DishId", "UserReviewdetail", "UserReviewRating", "UserReviewDate", "UserId") FROM \'${dirPath}\'`; // assuming tab is the dilim

console.log(q);

client
  .query(q)
  .then(() => console.log("inserting success"))
  .then(() => client.query('SELECT * FROM "DishReviews"'))
  .then(res => console.log("succes: seed reviews"))
  .then(() => client.end())
  .catch(e => console.error("error, ", e));

//client.end();

// client.query('SELECT * FROM "Restaurants"', (err, res) => {
//     if(err) console.log('error');
//     else console.log('succes: ', res.rows);
//     client.end();
// });
