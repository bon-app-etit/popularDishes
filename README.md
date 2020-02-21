# popularDishes

# API Calls:

get /restaurants/:id/dish/:id/review

    req.body:

    response: 
       all reviews for that dish (json)

post /restaurants/:id/dish/:id/review

    req.body:
      - text ( review text )
      - date
      - starRating
      - friends
      - num_reviw
      - reviewerName
      - url_name (string)

    response: nothing

delete /restaurants/:id/dish/review/:id

    req.body
      <!-- - reviewerId -->
      - reviewId
      <!-- - userId -->

    return
      nothing

(might delete-- and use put instead for efficiency)
patch /restaurants/:id/dish/:id/review/:id  

    
    req.body
      - userId
      - reviewText
      - reviewRating
      - reviewId

    return: 
      nothing


<!-- put /restaurants/:id/review/:id   
    
    req.body
      - restaurantId  [might not need]
      - reviewText
      - reviewId
      - userId

    return: 
      nothing -->


need 2 to 3 optimaiation, justifiy that selection to a person,
do not base on speed