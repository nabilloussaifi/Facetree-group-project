const express = require("express");
const app = express();
const bcrypt = require('bcrypt');


const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://facetree:fHRvTR9SYxWbHDp@cluster0.0z7nf.mongodb.net/facetreedb?retryWrites=true&w=majority',  { useNewUrlParser: true, useUnifiedTopology: true })


const db = mongoose.connection;
//const usersdb = mongoose.connection.collections;
db.on('error', error => console.error(error));
db.on('connected', () => {
  console.log('database is connected successfully');
});
db.on('disconnected', () =>{
  console.log('database is disconnected successfully');
});

/* db.once('open', () => {
  console.log('connected to db')
}); */

module.exports = db;

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


var insertRouter = require('./routes/users');

app.use('/', insertRouter);






app.listen(process.env.PORT || 3000, () => console.log("Server Up and running"));