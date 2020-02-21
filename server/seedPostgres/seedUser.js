const { Pool, Client } = require("pg");
const path = require("path");

const client = new Client({
  user: "caseynguyen",
  host: "localhost",
  database: "test2"
});

client.connect();

// CREATE TABLE "Users" (
// 	"UserId" serial NOT NULL,
// 	"UserName" varchar(80) NOT NULL,
// 	"UserFriendsCount" int NOT NULL,
// 	"AvatarPhoto" varchar(255),
// 	"UserReviewsCount" int NOT NULL,

var dirPath = path.join(__dirname, "../preSeedPostgres/data/users.txt");
console.log(dirPath);
//dirPath = '/Users/caseynguyen/Desktop/Bon-App-Etit/tryPost/preSeed/popularDishes.txt';
const q = `COPY "Users" ("UserName", "UserFriendsCount", "AvatarPhoto", "UserReviewsCount") FROM \'${dirPath}\'`; // assuming tab is the dilim

console.log(q);

client
  .query(q)
  .then(() => console.log("inserting success"))
  .then(() => client.query('SELECT * FROM "Users"'))
  .then(res => console.log("succes: seed user"))
  .then(() => client.end())
  .catch(e => console.error("error, ", e));
