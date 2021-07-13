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
app.use(express.static("public"));

mongoose.connect(
  "mongodb+srv://facetree:fHRvTR9SYxWbHDp@cluster0.0z7nf.mongodb.net/facetreedb?retryWrites=true&w=majority",
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

app.get("/floor", async (req, res) => {
  const dbposts = await Post.find({});
  console.log(dbposts);
  res.render("floor.ejs", { dbposts });
});

app.get('/hall', ensureAuthenticated, async (req, res) => {
  try {
    const posts = await Post.find({}).populate('author')
    res.render('hall.ejs', { posts })
  } catch (err) { console.log(err) }
})

app.post("/floor/createpost", (req, res) => {

  const newPost = new Post({
    ...req.body
  });
  newPost.author = req.user._id
  newPost.save().then(() => {
    res.redirect("/floor");
  });
});


app.listen(process.env.PORT || 3000, () =>
  console.log("Server Up and running")
);
