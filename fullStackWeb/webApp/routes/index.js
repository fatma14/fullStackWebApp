const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.post("/signup", (req, res, next) => {
  res.redirect("signup.hbs");
});

module.exports = router;
