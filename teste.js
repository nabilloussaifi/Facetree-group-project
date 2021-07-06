var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://facetree:fHRvTR9SYxWbHDp@cluster0.0z7nf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true } function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});


//create db "facetreedb"
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/facetreedb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

//create collection (sqlite 'table')
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("facetreedb");
  dbo.createCollection("registerdata", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
}); 

//inside a function with path to the brain&frontend
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("facetreedb");
  var myobj = { name: "Company Inc", address: "Highway 37" };
  dbo.collection("registerdata").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
}); 