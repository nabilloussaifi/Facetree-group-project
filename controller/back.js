//connect


import { MongoClient } from 'mongodb'

export async function connect () {
  // Connection URL
  const url = 'mongodb://localhost:27017/my_database'

  let db

  try {
    db = await MongoClient.connect(url)
    console.log('Connected successfully!')
  } catch (err) {
    // Handle error
  }

  return db
}

//insert document
export async function insertDocuments (db) {
  // Get the documents collection
  const collection = db.collection('restaurants')

  // Insert some documents
  const result = await collection.insertMany([
    {
      name: 'Sun Bakery Trattoria',
      stars: 4,
      categories: [
        'Pizza', 'Pasta', 'Italian', 'Coffee', 'Sandwiches'
      ]
    }, {
      name: 'Blue Bagels Grill',
      stars: 3,
      categories: [
        'Bagels', 'Cookies', 'Sandwiches'
      ]
    }
  ])

  return result
}

//create a query
export async function findDocuments () {
  const collection = db.collection('restaurants')

  const docs = await collection.find({}).toArray()

  console.log('Found the following records')
  console.log(docs)

  return docs
}

//build a index
export async function indexCollection (db) {
  const collection = db.collection('restaurants')

  const result = await collection.createIndex({
    name: 1
  })

  return result
}

//agregate
export async function aggregateDocuments (db) {
  const collection = db.collection('restaurants')

  const results = await collection.aggregate([
    {
      $match: {
        categories: 'Bakery'
      }
    }, {
      $group: {
        _id: '$stars',
        count: { $sum: 1 }
      }
    }
  ])

  return results
}


const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://facetree:fHRvTR9SYxWbHDp@cluster0.0z7nf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
