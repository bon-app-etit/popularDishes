const fs = require('fs');
const path = require('path');
const faker = require('faker');
const loremIpsum = require("lorem-ipsum").loremIpsum;

// remember to change to 4000 later
const RESTAURANT_MAX = 4000;

// random number between min and max
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const dirPath = path.join(__dirname, "/data/popularDishes.txt");
for(let restaurantID = 1; restaurantID <= RESTAURANT_MAX; restaurantID++){ 

    let maxDish = 5; // randomIntFromInterval(5, 6);
    for(let dishNum = 0; dishNum < maxDish; dishNum++){
        // '$' + randomIntFromInterval(25, 45) + '.00';
        let dishName = faker.address.streetName() + ' Dish';
        let dishIngredients = loremIpsum();
        let dishCoverPicture = faker.image.food();
        let dishPrice = randomIntFromInterval(20, 45);
        // '$' + randomIntFromInterval(20, 45) + '.00'; for later purposes
        var dishConcat = restaurantID + '\t' + dishName + '\t' + dishIngredients + '\t'
                            + dishCoverPicture + '\t' + dishPrice;

        fs.appendFileSync(dirPath, dishConcat, function(err) {
            if (err) throw err;
        });
    
        if(!(restaurantID === RESTAURANT_MAX && dishNum === maxDish-1)){
            fs.appendFileSync(dirPath, "\n", function(err) {
                if (err) throw err;
            });
        }                     
    }

}