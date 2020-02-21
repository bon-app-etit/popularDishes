const fs = require('fs');
const path = require('path');
const faker = require('faker');

// writing restauranta dat to 'restaurantName.txt'

const dirPath = path.join(__dirname, "/data/restaurantName.txt");
for(let j = 0; j < 4; j++){
    let restaurantName = [];
    for(var i = 0; i < 1000; i++){
        restaurantName.push(faker.address.streetName() + ' Restaurant');
    }

    fs.appendFileSync(dirPath, restaurantName.join("\n"), function(err) {
        if (err) throw err;
    });

    if(!(j === 3 && i === 1000)){
        fs.appendFileSync(dirPath, "\n", function(err) {
            if (err) throw err;
        });
    }   
}

