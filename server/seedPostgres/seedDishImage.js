const { Pool, Client } = require("pg");
const path = require("path");

const client = new Client({
  user: "caseynguyen",
  host: "localhost",
  database: "test2"
});

client.connect();

// CREATE TABLE "DishImageURLs" (
// 	"Photo" varchar(255) NOT NULL,
// 	"DishId" int NOT NULL,
// 	"PhotoDescription" varchar(80) NOT NULL
// var dirPath = path.join(__dirname, "../preSeedPostgres/data/users.txt");

var dirPath = path.join(__dirname, "../preSeedPostgres/data/dishImageURL.txt");
console.log(dirPath);
//dirPath = '/Users/caseynguyen/Desktop/Bon-App-Etit/tryPost/preSeed/popularDishes.txt';
const q = `COPY "DishImageURLs" ("Photo", "DishId", "PhotoDescription") FROM \'${dirPath}\'`; // assuming tab is the dilim

console.log(q);

client
  .query(q)
  .then(() => console.log("inserting success"))
  .then(() => client.query('SELECT * FROM "DishImageURLs"'))
  .then(res => console.log("succes: seed dish image url"))
  .then(() => client.end())
  .catch(e => console.error("error, ", e));
