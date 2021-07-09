const express = require("express");
const router = express.Router();
const app = express();
const mongoose = require("mongoose");
const expressEjsLayout = require("express-ejs-layouts");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const Post = require("./models/post.js");


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

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/floor", require("./routes/floor"));

app.post("/users/floor", (req, res) => {
  //console.log(req.body);
  const { title, content, img } = req.body;
  const newPost = new Post({
    title: title,
    content: content,
    img: img,
  })
        newPost
              .save()
              .then(() => {
                res.redirect("/floor");
              })
            })

// app.use("/", routes);
// app.use(app.router);
// routes.initialize(app);

app.listen(process.env.PORT || 3000, () =>
  console.log("Server Up and running")
);
