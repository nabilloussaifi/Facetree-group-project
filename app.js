const express = require("express");
const router = express.Router();
const app = express();
const mongoose = require("mongoose");
const expressEjsLayout = require("express-ejs-layouts");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const Post = require("./models/posts.js");
const ejs = require("ejs");
const { ensureAuthenticated } = require("./config/auth");
require('dotenv').config();


app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.on("connected", () => {
  console.log("database is connected successfully");
});
db.on("disconnected", () => {
  console.log("database is disconnected successfully");
});

//module.exports = db;

require("./config/passport")(passport);

app.set("view engine", "ejs");
app.use(expressEjsLayout);

// app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//use flash
app.use(flash());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use("/users", require("./routes/users"));

//login page
app.get("/", (req, res) => {
  res.render("login");
});
//register page
app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/floor", ensureAuthenticated, async (req, res) => {
  const dbposts = await Post.find({}).populate('author');
  // console.log(req.user);
  res.render("floor.ejs", { dbposts });
});

app.get("/hall", ensureAuthenticated, async (req, res) => {
  try {
    const posts = await Post.find({}).populate("author");
    res.render("hall.ejs", { posts });
  } catch (err) {
    console.log(err);
  }
});

const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = today.getFullYear();
const now = `${dd}/${mm}/${yyyy}`;

app.post("/floor/createpost", (req, res) => {
  const newPost = new Post({
    ...req.body, date: now,
  });
  newPost.author = req.user._id;
  newPost.save().then(() => {
    res.redirect("/floor");
  });
});
app.get('/floor/editpost/:id', async (req, res) => {
  try {
    const { id } = req.params
    const post = await Post.findById(id)
    res.render('updatepost.ejs', { post })
  } catch (err) {
    console.log(err)
  }
})

app.post('/floor/editpost/:id', async (req, res) => {
  try {
    const { id } = req.params
    await Post.findByIdAndUpdate(id, req.body)
    res.redirect('/floor')
  } catch (err) {
    console.log(err)
  }
})
app.post('/floor/deletepost/:id', async (req, res) => {
  try {
    const { id } = req.params
    await Post.findByIdAndDelete(id)
    res.redirect('/floor')
  } catch (err) {
    console.log(err)
  }
})




app.listen(process.env.PORT || 4000, () =>
  console.log("Server Up and running")
);
