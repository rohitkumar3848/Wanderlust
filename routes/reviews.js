const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const {isLoggedIn,validateReview,isOwner}=require("../middleware.js");
const ReviewController=require("../controllers/review.js");



//Reviews 
//Post Route
router.post("/",isLoggedIn,validateReview,wrapAsync(ReviewController.createReview));

//Reviews 
//Delete Route
router.delete("/:reviewId",isLoggedIn,wrapAsync( ReviewController.deleteReview));

module.exports=router;
