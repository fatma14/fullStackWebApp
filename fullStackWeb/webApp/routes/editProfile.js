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
   

  router.post("/edit", (req, res, next) => {

    User.findByIdAndUpdate(req.user.id, {
        $pull: {
          preferences: {$in: req.body.sources},
          languages: {$in: req.body.userLanguages},
          category: {$in: req.body.category}
        }
      }, {
        new: true
      })
      .then(result => {
        res.send(result)
        // res.json(result)
      })
      .catch(err => console.log(err))
  })




module.exports = router;