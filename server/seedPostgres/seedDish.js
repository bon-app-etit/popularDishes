const { Pool, Client } = require("pg");
const path = require("path");

const client = new Client({
  user: "caseynguyen",
  host: "localhost",
  database: "test2"
});

client.connect();

// CREATE TABLE "PopularDishes" (
// 	"DishId" serial NOT NULL,
// 	"RestaurantId" int NOT NULL,
// 	"DishName" varchar(80) NOT NULL,
// 	"DishIngredients" varchar(80) NOT NULL,
// 	"DishCoverPicture" varchar(255) NOT NULL,
// 	"DishPrice" int NOT NULL,
// 	CONSTRAINT "PopularDishes_pk" PRIMARY KEY ("DishId")
// var dirPath = path.join(__dirname, "../preSeedPostgres/data/users.txt");
var dirPath = path.join(__dirname, "../preSeedPostgres/data/popularDishes.txt");
// "../preSeedPostgres/data/restaurantName.txt"

console.log(dirPath);
//dirPath = '/Users/caseynguyen/Desktop/Bon-App-Etit/tryPost/preSeed/popularDishes.txt';
const q = `COPY "PopularDishes" ("RestaurantId", "DishName", "DishIngredients", "DishCoverPicture", "DishPrice") FROM \'${dirPath}\'`; // assuming tab is the dilim

console.log(q);

client
  .query(q)
  .then(() => console.log("inserting success"))
  .then(() => client.query('SELECT * FROM "PopularDishes"'))
  .then(res => console.log("succes: seed dish"))
  .then(() => client.end())
  .catch(e => console.error("error, ", e));
