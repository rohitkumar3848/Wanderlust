const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listing.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});


router
.route("/")
//Index
.get(isLoggedIn, wrapAsync(listingController.index))
//Create
.post(isLoggedIn,upload.single('listing[image]'),wrapAsync(listingController.createListing));


//New Route
router.get("/new",isLoggedIn,wrapAsync(listingController.new));

router
.route("/:id")
.put(isLoggedIn,isOwner,wrapAsync,upload.single('listing[image]'),wrapAsync( listingController.updateListing))
.get(isLoggedIn,wrapAsync(listingController.showListings));


//Edit Request
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListing));

//Delete Request
router.get("/:id/delete",isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));


module.exports=router;