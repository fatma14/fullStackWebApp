const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("home-page");
});

/* Get preferences page after signup */
router.get("/preferences", (req, res, next) => {
  res.render("preferences")
});

/* Get articles page after login */
router.get("/articles", (req, res, next) => {
res.render("articles")
})

/* signup */
router.post("/signup", (req, res, next) => {
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
        .then( 
          res.redirect("/preferences")
         )

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


//Google log in 
router.get("/google", passport.authenticate("google", {scope: ["content"]}))

router.get(
  "/google/callback", 
  passport.authenticate("google", {
    sucessRedirect: "/articles",
    failureRedirect: "/"
  })
  )


module.exports = router;
