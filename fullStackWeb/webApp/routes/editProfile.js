const express = require("express");

const User = require("../models/User");
const router = express.Router();

router.get("/edit", (req, res, next) => {
  
    res.render("editProfile")
  })


module.exports = router;