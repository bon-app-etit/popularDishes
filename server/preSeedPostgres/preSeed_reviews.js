const fs = require('fs');
const path = require('path');
const faker = require('faker');
const loremIpsum = require("lorem-ipsum").loremIpsum;

// remembert to changee to 20,000/ 24,000
const DISH_MAX = 20000;

// remembert to changee to 500
const REVIEW_MAX  = 500;

// remembert to changee to 100000
const USER_MAX  = 100000;

// random number between min and max
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const dirPath = path.join(__dirname, "/data/reviews.txt");

// "ReviewId" serial NOT NULL,
// "DishId" int NOT NULL,
// "UserReviewdetail" varchar(255) NOT NULL,
// "UserReviewRating" int NOT NULL,
// "UserReviewDate" DATE NOT NULL,
// "UserID" int NOT NULL,

var userReviewdetail = loremIpsum({
    count: 1,                // Number of "words", "sentences", or "paragraphs"
    format: "plain",         // "plain" or "html"
    paragraphLowerBound: 3,  // Min. number of sentences per paragraph.
    paragraphUpperBound: 5,  // Max. number of sentences per paragarph.
    random: Math.random,     // A PRNG function
    sentenceLowerBound: 5,   // Min. number of words per sentence.
    sentenceUpperBound: 8,  // Max. number of words per sentence.
    suffix: "\n",            // Line ending, defaults to "\n" or "\r\n" (win32)
    units: "paragraph"       // paragraph(s), "sentence(s)", or "word(s)"
  });

if(userReviewdetail.length > 255){
    userReviewdetail = userReviewdetail.substring(0, 255);
    userReviewdetail[userReviewdetail.length-1] = '.'
}
// console.log(`${randomIntFromInterval(1,12)}/${randomIntFromInterval(1,28)}/${randomIntFromInterval(2012,2019)}`);

for(let dishID = 1; dishID <= DISH_MAX; dishID++){ 

    // let maxDish = randomIntFromInterval(4, 6);
    for(let reviewNum = 0; reviewNum < REVIEW_MAX; reviewNum++){
        let userReviewRating = randomIntFromInterval(1, 5);
        let userReviewDate = `${randomIntFromInterval(1,12)}/${randomIntFromInterval(1,28)}/${randomIntFromInterval(2012,2019)}`;
        let userId = randomIntFromInterval(1, USER_MAX);


        var reviewConcat = dishID + '\t' + userReviewdetail + '\t' + userReviewRating + '\t'
        + userReviewDate + '\t' + userId;

        fs.appendFileSync(dirPath, reviewConcat, function(err) {
        if (err) throw err;
        });

        if(!(dishID === DISH_MAX && reviewNum === REVIEW_MAX-1)){
            fs.appendFileSync(dirPath, "\n", function(err) {
                if (err) throw err;
            });
        }  
    }
    if(dishID % 200 === 0 ) console.log("write count: ", dishID*REVIEW_MAX);
}