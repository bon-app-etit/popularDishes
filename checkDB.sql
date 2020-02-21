\c test2;
-- select * from "Restaurants" order by "RestaurantId" desc limit 10;
-- select * from "PopularDishes" order by "DishId" desc limit 10;
-- select "ReviewId", "UserReviewRating", "UserReviewDate",  "UserId"  from "DishReviews" order by "ReviewId" desc limit 10;
-- select * from "Users" order by "UserId" desc limit 10;
-- select * from "DishImageURLs" order by "DishId" desc limit 10;

CREATE INDEX idx_DishReviews_ReviewId ON "DishReviews"("ReviewId");


-- psql -f checkDB.sql
