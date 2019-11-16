const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});




router.post("/content", (req, res, next) => {
 const {username, password, birthday, email } = req.body;
  
 if(!username) {
    res.render ("index.hbs" , {message: "You have to fill the field"});
    return
  }  if(password.length < 4) {
    res.render("index.hbs", {message: "Password is too short"})
  }

  
  User.findOne({username})
  .then(found =>{
    if(found) {
    res.render("index.hbs", {message: "User already exists"})
    return;
    }

     bcrypt.genSalt()
     .then(salt =>{
        return bcrypt.hash(password, salt)
    })
    .then(hash => {
      return User.create({username: username, password: hash, email: email, birthday: birthday})
    })
      })
    })
    
      

    
/*
User.create({
  username,
  password,
  email: email,
  birthday: birthday
})
*/

  
    
   /*.then(newUser => {
      res.render("content");
    })
    .catch(err => {
      console.log(err);
    });
})
*/




module.exports = router;
