-- \c test2;
-- ALTER TABLE "PopularDishes" ADD CONSTRAINT "PopularDishes_fk0" FOREIGN KEY ("RestaurantId") REFERENCES "Restaurants"("RestaurantId");
-- ALTER TABLE "DishReviews" ADD CONSTRAINT "DishReviews_fk0" FOREIGN KEY ("DishId") REFERENCES "PopularDishes"("DishId");
-- ALTER TABLE "DishReviews" ADD CONSTRAINT "DishReviews_fk1" FOREIGN KEY ("UserId") REFERENCES "Users"("UserId");
-- ALTER TABLE "DishImageURLs" ADD CONSTRAINT "DishImageURLs_fk0" FOREIGN KEY ("DishId") REFERENCES "PopularDishes"("DishId");

