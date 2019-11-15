const express = require("express");
const router = express.Router();
const User = require("../models/User");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.post("/content", (req, res, next) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    birthday: req.body.birthday
  })
    .then(newUser => {
      res.render("content.hbs");
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
