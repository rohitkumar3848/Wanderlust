const Listing=require("../models/listing");
const Review=require("../models/reviews");

module.exports.createReview=async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview=await Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save(); 
    req.flash("success","New Review created sucessfully");
    res.redirect(`/listings/${listing._id}`);
}

module.exports.deleteReview=async (req, res) => {
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted sucessfully");
    res.redirect(`/listings/${id}`);
};
