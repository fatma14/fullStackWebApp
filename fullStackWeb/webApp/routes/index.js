const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passeport = require("passport")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//  router.get("/", (req, res, next) => {
//    res.render("content")
//  });



router.post("/content", (req, res, next) => {
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
