const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

//login page
router.get("/", (req, res) => {
  res.render("login");
});
//register page
router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/floor", (req, res) => {
  res.render("floor");
});

router.get("/hall", ensureAuthenticated, (req, res) => {
  res.render("hall", {
    user: req.user,
  });
});

module.exports = router;
