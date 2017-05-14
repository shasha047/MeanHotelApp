var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

module.exports.reviewsGetAll = function(req,res){
    var hotelId = req.params.hotelId;
        // var thisHotel = hotelData[hotelId];
        console.log("Get the hotelId " + hotelId);

        //collection
        Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(err,doc){
            res
                .status(200)
                .json(doc.reviews);
        });
};

module.exports.reviewsGetOne = function(req,res){
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
     console.log("Get the reviewId " + reviewId + 'for hotelId' +hotelId);

       Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(err,hotel){
            console.log("Returned Hotel ", hotel);
            var review = hotel.reviews.id(reviewId);
            res
                .status(200)
                .json(review);
        }); 
};


var _addReview =function(req,res,hotel){
    hotel.reviews.push({
        name : req.body.name,
        rating : parseInt(req.body.rating,10),
        review : req.body.review
    });

    hotel.save(function(err,hotelUpdated){
        if(err){
            res
            .status(500)
            .json(err);
        }
        else{
            res
            .status(201)
            .json(hotelUpdated.reviews[hotelUpdated.reviews.length-1]);
        }
    });
};

module.exports.reviewsAddOne = function(req,res){
     var hotelId = req.params.hotelId;
        // var thisHotel = hotelData[hotelId];
        console.log("Get the hotelId " + hotelId);

        //collection
        Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(err,doc){
            var response = {
                status : 200,
                message : []
            }
            if(err){
                console.log('Error finding hotels');
                response.status = 500;
                response.message = err
            }
            else if(!doc){
                response.status = 404;
                response.message = {
                    "message" : "Hotel ID not Found"
                };
            }
            if(doc){
                _addReview(req,res,doc);
            }
            else{
                res
                .status(response.status)
                .json(response.message);
            }
        });
};

module.exports.reviewsUpdateOne = function(req,res){
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;
  console.log('PUT reviewId ' + reviewId + ' for hotelId ' + hotelId);

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel) {
      var thisReview;
      var response = {
        status : 200,
        message : {}
      };
      if (err) {
        console.log("Error finding hotel");
        response.status = 500;
        response.message = err;
      } else if(!hotel) {
        console.log("Hotel id not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "Hotel ID not found " + id
        };
      } else {
        // Get the review
        thisReview = hotel.reviews.id(reviewId);
        // If the review doesn't exist Mongoose returns null
        if (!thisReview) {
          response.status = 404;
          response.message = {
            "message" : "Review ID not found " + reviewId
          };
        }
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.message);
      } else {
        thisReview.name = req.body.name;
        thisReview.rating = parseInt(req.body.rating, 10);
        thisReview.review = req.body.review;
        hotel.save(function(err, hotelUpdated) {
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });
      }
    });
};


module.exports.reviewsDeleteOne = function(req,res){
     var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;
  console.log('PUT reviewId ' + reviewId + ' for hotelId ' + hotelId);

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel) {
      var thisReview;
      var response = {
        status : 200,
        message : {}
      };
      if (err) {
        console.log("Error finding hotel");
        response.status = 500;
        response.message = err;
      } else if(!hotel) {
        console.log("Hotel id not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "Hotel ID not found " + id
        };
      } else {
        // Get the review
        thisReview = hotel.reviews.id(reviewId);
        // If the review doesn't exist Mongoose returns null
        if (!thisReview) {
          response.status = 404;
          response.message = {
            "message" : "Review ID not found " + reviewId
          };
        }
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.message);
      } else {
        hotel.reviews.id(reviewId).remove();
        hotel.save(function(err, hotelUpdated) {
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });
      }
    });
};