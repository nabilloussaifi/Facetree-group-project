const express = require("express");
const router = express.Router();
const Post = require("../models/post.js");

router.get("/floor", (req, res) => {
  res.render("floor");
});
router.post("users/floor", (req, res) => {
  console.log(req.body);
  res.render("floor");
});

module.exports = router;
