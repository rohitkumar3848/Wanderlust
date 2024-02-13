const express=require("express");
const wrapAsync = require("../utils/wrapAsync");
const router=express.Router();
const passport = require("passport");
const UserController=require("../controllers/user.js");


router
.route("/signup")
.get(UserController.renderSignUpForm)
.post(wrapAsync(UserController.signup));


router
.route("/login")
.get(UserController.renderLoginForm)
.post(passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),UserController.login);


router.get("/logout",UserController.logout);


module.exports=router;
