const express = require("express");
const router = express.Router();
const User = require("../models/User");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
<<<<<<< HEAD
});

router.post("/content", (req, res, next) => {
  const {username, password, birthday, email } = req.body
  User.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    birthday: req.body.birthday
  })
    .then(newUser => {
<<<<<<< HEAD
      res.render("content.hbs");
=======
      res.render("content");
>>>>>>> e9f9a0898d9df817e452c82adc45d1c1635cdb4f
    })
    .catch(err => {
      console.log(err);
    });
=======
>>>>>>> master
});

router.post("/content", (req, res, next) => {
 const {username, password, birthday, email } = req.body
/*User.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    birthday: req.body.birthday
  })*/

  if(!username) {
    res.render ("index.hbs" , {message: "You have to fill the field"});
    return
  }  if(password.length < 4) {
    res.render("index.hbs", {message: "Password is too short"})
  }
})
    /*User.findOne({username:username}) 
    .then(
      if(found =>
      res.render("index.hbs", {message: "User already exists"})
      )
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
