const express = require("express");
const app = express();
const bcrypt = require('bcrypt');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://facetree:fHRvTR9SYxWbHDp@cluster0.0z7nf.mongodb.net/facetreedb?retryWrites=true&w=majority',  { useNewUrlParser: true, useUnifiedTopology: true })


const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => {
  let data = db.users.find({});
  console.log(data)
});

// app setup
app.use(express.json())
app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: false }))
app.set("view engine", "ejs");


// pages
app.get('/',(req, res) => {
  res.render('login.ejs');
});

app.get('/register',(req, res) => {
  res.render('register.ejs');
});

app.post('/register', async (req, res) => { 
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/')
  } catch {
    res.redirect('/register')
  }
  console.log(users)
})

app.get('/hall',(req, res) => {
  res.render('hall.ejs', { name: 'username' });
});

app.get('/floor',(req, res) => {
  res.render('floor.ejs');
});









app.listen(process.env.PORT || 3000, () => console.log("Server Up and running"));