const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");


const {getTopHeadlines} = require("../service/api")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("home-page");
});

/* Get preferences page after signup */

router.get('/preferences', (req, res,next) => {
  getTopHeadlines()
  .then(data => {
    console.log(data.sources)
    res.render('preferences', {data});
  })
}
);

/* Get articles page after login */
router.get("/articles", (req, res, next) => {
  //console.log("req.user----------------", req.user)
res.render("articles")
})

router.post("/articles", (req, res, next) => {
  console.log(req.user);

  User.findByIdAndUpdate(req.body.user, {
    preferences: req.body.sources
  }, {new: true})
  .then(result => {
res.json(result)
  })
  .catch(err => console.log(err))

})

/* signup */
 router.post("/signup",
 (req, res, next) => {
   const {username, password, birthday, email } = req.body
  
   if(!username) {
     res.render ("home-page" , {message: "You have to fill the field"});
     return
   }  if(password.length < 4) {
     res.render("home-page", {message: "Password is too short"})
   }

     User.findOne({username:username}) 
     .then( found => {
       if(found) {
         res.render("home-page", {message: "User already exists"})
       }
         bcrypt.genSalt().then(salt => {
           return bcrypt.hash(password, salt)
         })
         .then(hash => User.create({username: username, password: hash, birthday: birthday, email: email}))
         .then(newUser => {
          //   authenticating the user with passport
          req.login(newUser, err => {
            if (err) next(err);
            else res.redirect("/preferences/");
          });
         


     }).catch(err => {res.render("/home-page", {message: "something is wrong!"})})
 })
})



/*Login */

router.post('/login',
  passport.authenticate('local', { successRedirect: '/articles',
                                   failureRedirect: '/',
                                   failureFlash: true })
);

/* Logout*/
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


// Google log in 

router.get("/google", passport.authenticate("google", {scope: ["content"]}))

router.get(
  "/google/callback", 
  passport.authenticate("google", {
    sucessRedirect: "/articles",
    failureRedirect: "/"
  })
  )

module.exports = router;
