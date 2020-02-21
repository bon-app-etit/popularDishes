const { Pool, Client } = require("pg");
const path = require("path");

const client = new Client({
  user: "caseynguyen",
  host: "localhost",
  database: "test2"
});

client.connect();

// var dirPath = path.join(__dirname, "../preSeedPostgres/data/users.txt");
const dirPath = path.join(
  __dirname,
  "../preSeedPostgres/data/restaurantName.txt"
);
const q = `COPY "Restaurants" ("RestaurantName") FROM \'${dirPath}\' DELIMITER ','`;
// const q = `COPY "Restaurants" ("RestaurantName") FROM '/Users/caseynguyen/Desktop/Bon-App-Etit/tryPost/restaurantName.txt' DELIMITER ','`;
// client.query(q, (err, res) => {
//     if(err) console.log('error ', err);
//     else console.log('inserting succes');
// });

client
  .query(q)
  .then(() => console.log("inserting success"))
  .then(() => client.query('SELECT * FROM "Restaurants"'))
  .then(res => console.log("succes: restaurant"))
  .then(() => client.end())
  .catch(e => console.error("error"));

//client.end();

// client.query('SELECT * FROM "Restaurants"', (err, res) => {
//     if(err) console.log('error');
//     else console.log('succes: ', res.rows);
//     client.end();
// });
