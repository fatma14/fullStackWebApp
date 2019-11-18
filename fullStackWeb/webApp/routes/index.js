const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport")
/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.post("/content", (req, res, next) => {
  res.render("content")
});
 router.get("/content", (req, res, next) => {
   res.render("content")
 });


router.get("/google", passport.authenticate("google", {scope: ["content"]}))

router.get(
  "/google/callback", 
  passport.authenticate("google", {
    sucessRedirect: "/content",
    failureRedirect: "/"
  })
  )




router.post("/index", (req, res, next) => {
  const {username, password, birthday, email } = req.body
  

  if(!username) {
    res.render ("index.hbs" , {message: "You have to fill the field"});
    return
  }  if(password.length < 4) {
    res.render("index.hbs", {message: "Password is too short"})
  }

    User.findOne({username:username}) 
    .then( found => {
      if(found) {
        res.render("index.hbs", {message: "User already exists"})
      }
        bcrypt.genSalt().then(salt => {
          return bcrypt.hash(password, salt)
        })
        .then(hash => User.create({username: username, password: hash, birthday: birthday, email: email}))
        .then( 
          res.render("content.hbs")
         )

    })
      
  
})



module.exports = router;
