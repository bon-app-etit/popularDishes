DROP DATABASE IF EXISTS test2;
CREATE DATABASE test2;
\c test2;

CREATE TABLE "Restaurants" (
	"RestaurantId" serial NOT NULL,
	"RestaurantName" varchar(80) NOT NULL,
	CONSTRAINT "Restaurants_pk" PRIMARY KEY ("RestaurantId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "PopularDishes" (
	"DishId" serial NOT NULL,
	"RestaurantId" int NOT NULL,
	"DishName" varchar(80) NOT NULL,
	"DishIngredients" varchar(255) NOT NULL,
	"DishCoverPicture" varchar(255) NOT NULL,
	"DishPrice" int NOT NULL,
	CONSTRAINT "PopularDishes_pk" PRIMARY KEY ("DishId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "DishReviews" (
	"ReviewId" serial NOT NULL,
	"DishId" int NOT NULL,
	"UserReviewdetail" varchar(255) NOT NULL,
	"UserReviewRating" int NOT NULL,
	"UserReviewDate" DATE NOT NULL,
	"UserId" int NOT NULL,
	CONSTRAINT "DishReviews_pk" PRIMARY KEY ("ReviewId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Users" (
	"UserId" serial NOT NULL,
	"UserName" varchar(80) NOT NULL,
	"UserFriendsCount" int NOT NULL,
	"AvatarPhoto" varchar(255),
	"UserReviewsCount" int NOT NULL,
	CONSTRAINT "Users_pk" PRIMARY KEY ("UserId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "DishImageURLs" (
	"Photo" varchar(255) NOT NULL,
	"DishId" int NOT NULL,
	"PhotoDescription" varchar(80) NOT NULL
) WITH (
  OIDS=FALSE
);

ALTER TABLE "PopularDishes" ADD CONSTRAINT "PopularDishes_fk0" FOREIGN KEY ("RestaurantId") REFERENCES "Restaurants"("RestaurantId");
ALTER TABLE "DishReviews" ADD CONSTRAINT "DishReviews_fk0" FOREIGN KEY ("DishId") REFERENCES "PopularDishes"("DishId");
ALTER TABLE "DishReviews" ADD CONSTRAINT "DishReviews_fk1" FOREIGN KEY ("UserId") REFERENCES "Users"("UserId");
ALTER TABLE "DishImageURLs" ADD CONSTRAINT "DishImageURLs_fk0" FOREIGN KEY ("DishId") REFERENCES "PopularDishes"("DishId");


-- Checking Purposes (should be empty)
select * from "Restaurants";
select * from "PopularDishes";
select *  from "DishReviews";
select * from "Users";
select * from "DishImageURLs";



-- psql -f popularDishSchema.sql