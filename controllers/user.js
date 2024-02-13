const User=require("../models/user");

module.exports.renderSignUpForm=(req,res)=>{
    res.render("user/signup.ejs");
};

module.exports.signup=async(req,res)=>{
    try{
        let {email,username,password}=req.body;
        const newUser=new User({email,username});
        const reg=await User.register(newUser,password);
        req.login(reg,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to Wanderlust");
            res.redirect("/listings");
        })
    }
    catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm=(req,res)=>{
    res.render("user/login.ejs"); 
};

module.exports.login=(req,res)=>{
    req.flash("success","Welcome to Wanderlusr!"); 
    res.redirect("/listings");
};

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
       if(err){
           return next(err);
       }
       req.flash("success","you are logged out!!");
       res.redirect("/login");
    });
};