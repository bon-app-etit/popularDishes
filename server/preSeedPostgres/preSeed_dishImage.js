const fs = require('fs');
const path = require('path');
const faker = require('faker');
const loremIpsum = require("lorem-ipsum").loremIpsum;

// remembert to changee to 16,000/ 24,000 ????
const DISH_MAX = 20000;

// random number between min and max
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function description() {
    var photoDescription = loremIpsum({
        count: 1,                // Number of "words", "sentences", or "paragraphs"
        format: "plain",         // "plain" or "html"
        random: Math.random,     // A PRNG function
        sentenceLowerBound: 2,   // Min. number of words per sentence.
        sentenceUpperBound: 5,  // Max. number of words per sentence.
        suffix: "\n",            // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "sentence"       // paragraph(s), "sentence(s)", or "word(s)"
    });

    if(photoDescription.length > 80){
        photoDescription = photoDescription.substring(0, 80);
        photoDescription[photoDescription.length-1] = '.'
    }

    return photoDescription;
}



// CREATE TABLE "DishImageURLs" (
// 	"Photo" varchar(255) NOT NULL,
// 	"DishId" int NOT NULL,
// 	"PhotoDescription" varchar(80) NOT NULL

const dirPath = path.join(__dirname, "/data/dishImageURL.txt");
for(let dishID = 1; dishID <= DISH_MAX; dishID++){ 

    let maxDishImageURL = randomIntFromInterval(4, 6);
    for(let dishImage = 0; dishImage < maxDishImageURL; dishImage++){
        let photo = faker.image.food();
        let photoDescription = description();

        var dishImageURLConcat = photo + '\t' + dishID + '\t' + photoDescription;

        //console.log(dishImageURLConcat);

        fs.appendFileSync(dirPath, dishImageURLConcat, function(err) {
        if (err) throw err;
        });

        if(!(dishID === DISH_MAX && dishImage === maxDishImageURL-1)){
            fs.appendFileSync(dirPath, "\n", function(err) {
                if (err) throw err;
            });
        }  
    }
}