\c test2;
-- \timing
-- select "ReviewId", "UserReviewRating", "UserReviewDate",  "UserId"  from "DishReviews" where "ReviewId"= 1000000  limit 1;
-- select "ReviewId", "UserReviewRating", "UserReviewDate",  "UserId"  from "DishReviews" where "ReviewId"= 4000000  limit 1;
-- select "ReviewId", "UserReviewRating", "UserReviewDate",  "UserId"  from "DishReviews" where "ReviewId"= 7000000  limit 1;
-- select "ReviewId", "UserReviewRating", "UserReviewDate",  "UserId"  from "DishReviews" where "ReviewId"= 9999000  limit 1;
-- INSERT INTO "DishReviews" ("ReviewId", "DishId", "UserReviewdetail", "UserReviewRating", "UserReviewDate", "UserId" ) values (10000001, 19998, 'Hello world', 1, '2019-10-21', 70110 ) ;
-- select *  from "DishReviews" where "ReviewId"= 10000001  limit 1;
-- UPDATE  "DishReviews" SET "UserReviewdetail" = 'good morning' WHERE "ReviewId"= 10000001;	
-- DELETE FROM "DishReviews"  WHERE "ReviewId"= 10000001;
-- \timing

select "ReviewId", "UserReviewRating", "UserReviewDate",  "UserId"  from "DishReviews" where "ReviewId"= 9999000  limit 1;

INSERT INTO "DishReviews" ("ReviewId", "DishId", "UserReviewdetail", "UserReviewRating", "UserReviewDate", "UserId" ) values (10000001, 19998, 'Hello world', 1, '2019-10-21', 70110 ) ;

UPDATE  "DishReviews" SET "UserReviewdetail" = 'good morning' WHERE "ReviewId"= 10000001;	

DELETE FROM "DishReviews"  WHERE "ReviewId"= 10000001;

-- psql -f checkTiming.sql

-- INSERT INTO "DishReviews" ("ReviewId", "DishId", "UserReviewdetail", "UserReviewRating", "UserReviewDate", "UserId" ) values (10000001, 19998, 'Hello world', 1, '2019-10-21', 70110 ) ;
-- select *  from "DishReviews" where "ReviewId"= 10000001  limit 1;
-- UPDATE  "DishReviews" SET "UserReviewdetail" = 'good morning' WHERE "ReviewId"= 10000001;	
-- DELETE FROM "DishReviews"  WHERE "ReviewId"= 10000002;
