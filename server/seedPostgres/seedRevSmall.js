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

console.log("starting seed reviews...");
console.log("q0");

var fileCount = 0;

var dirPath = path.join(
  __dirname,
  `../preSeedPostgres/data/reviews${fileCount}.txt`
);

const q0 = `COPY "DishReviews" ("DishId", "UserReviewdetail", "UserReviewRating", "UserReviewDate", "UserId") FROM \'${dirPath}\'`; // assuming tab is the dilim
dirPath = path.join(__dirname, `../preSeedPostgres/data/reviews${1}.txt`);
const q1 = `COPY "DishReviews" ("DishId", "UserReviewdetail", "UserReviewRating", "UserReviewDate", "UserId") FROM \'${dirPath}\'`; // assuming tab is the dilim
dirPath = path.join(__dirname, `../preSeedPostgres/data/reviews${2}.txt`);
const q2 = `COPY "DishReviews" ("DishId", "UserReviewdetail", "UserReviewRating", "UserReviewDate", "UserId") FROM \'${dirPath}\'`; // assuming tab is the dilim
dirPath = path.join(__dirname, `../preSeedPostgres/data/reviews${3}.txt`);
const q3 = `COPY "DishReviews" ("DishId", "UserReviewdetail", "UserReviewRating", "UserReviewDate", "UserId") FROM \'${dirPath}\'`; // assuming tab is the dilim
dirPath = path.join(__dirname, `../preSeedPostgres/data/reviews${4}.txt`);
const q4 = `COPY "DishReviews" ("DishId", "UserReviewdetail", "UserReviewRating", "UserReviewDate", "UserId") FROM \'${dirPath}\'`; // assuming tab is the dilim
dirPath = path.join(__dirname, `../preSeedPostgres/data/reviews${5}.txt`);
const q5 = `COPY "DishReviews" ("DishId", "UserReviewdetail", "UserReviewRating", "UserReviewDate", "UserId") FROM \'${dirPath}\'`; // assuming tab is the dilim
dirPath = path.join(__dirname, `../preSeedPostgres/data/reviews${6}.txt`);
const q6 = `COPY "DishReviews" ("DishId", "UserReviewdetail", "UserReviewRating", "UserReviewDate", "UserId") FROM \'${dirPath}\'`; // assuming tab is the dilim
dirPath = path.join(__dirname, `../preSeedPostgres/data/reviews${7}.txt`);
const q7 = `COPY "DishReviews" ("DishId", "UserReviewdetail", "UserReviewRating", "UserReviewDate", "UserId") FROM \'${dirPath}\'`; // assuming tab is the dilim
dirPath = path.join(__dirname, `../preSeedPostgres/data/reviews${8}.txt`);
const q8 = `COPY "DishReviews" ("DishId", "UserReviewdetail", "UserReviewRating", "UserReviewDate", "UserId") FROM \'${dirPath}\'`; // assuming tab is the dilim
dirPath = path.join(__dirname, `../preSeedPostgres/data/reviews${9}.txt`);
const q9 = `COPY "DishReviews" ("DishId", "UserReviewdetail", "UserReviewRating", "UserReviewDate", "UserId") FROM \'${dirPath}\'`; // assuming tab is the dilim

// console.log(q);

client
  .query(q0)
  .then(() => client.query(q1))
  .then(() => client.query(q2))
  .then(() => client.query(q3))
  .then(() => client.query(q4))
  .then(() => client.query(q5))
  .then(() => client.query(q6))
  .then(() => client.query(q7))
  .then(() => client.query(q8))
  .then(() => client.query(q9))
  .then(() => console.log("succes: seed reviews"))
  .then(() => client.end())
  .catch(e => console.error("error, ", e));

//client.end();

// client.query('SELECT * FROM "Restaurants"', (err, res) => {
//     if(err) console.log('error');
//     else console.log('succes: ', res.rows);
//     client.end();
// });
