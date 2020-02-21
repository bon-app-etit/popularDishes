const fs = require('fs');
const path = require('path');
const faker = require('faker');
const loremIpsum = require("lorem-ipsum").loremIpsum;

// random number between min and max
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// remember to change to 100000
const USER_MAX  = 100000;

// "UserId" serial NOT NULL,
// "UserName" varchar(80) NOT NULL,
// "UserFriendsCount" int NOT NULL,
// "AvatarPhoto" varchar(255),
// "UserReviewsCount" int NOT NULL,
// CONSTRAINT "Users_pk" PRIMARY KEY ("UserId")

const dirPath = path.join(__dirname, "/data/users.txt");

// console.log(faker.name.firstName() + ' ' + String.fromCharCode(65+Math.floor(Math.random() * 26)) + '.');
// console.log(faker.image.people());

for(var i = 0; i < USER_MAX; i++){
    let userName = faker.name.firstName() + ' ' + String.fromCharCode(65+Math.floor(Math.random() * 26)) + '.'
    let userFriendsCount = randomIntFromInterval(0,500);
    let avatarPhoto = faker.image.people();
    let userReviewsCount = randomIntFromInterval(0,200);

    var userConcat = userName + '\t' + userFriendsCount + '\t' + avatarPhoto + '\t'
                        + userReviewsCount;

    fs.appendFileSync(dirPath, userConcat, function(err) {
        if (err) throw err;
    });
    
    if(!(i === USER_MAX-1)){
        fs.appendFileSync(dirPath, "\n", function(err) {
            if (err) throw err;
        });
    }   
}

