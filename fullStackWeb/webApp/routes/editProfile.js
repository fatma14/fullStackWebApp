const express = require("express");

const User = require("../models/User");
const axios = require("axios")
const router = express.Router();



router.get("/edit", (req, res, next) => {
  User.findById(req.user.id).then(user => {
    //res.send(user)
    res.render("editProfile",user)
  })
  })


   
  
   

  

module.exports = router;