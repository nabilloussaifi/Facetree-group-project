const express = require("express");
const app = express();

// app setup
app.use(express.json())
app.use("/static", express.static("public"));
app.set("view engine", "ejs");

// pages
app.get('/',(req, res) => {
  res.render('login.ejs');
});

app.get('/hall',(req, res) => {
  res.render('hall.ejs');
});

app.get('/floor',(req, res) => {
  res.render('floor.ejs');
});









app.listen(process.env.PORT || 3000, () => console.log("Server Up and running"));