const express = require('express')
const app = express()
const port = 5000

//user : mydbuser1
//pass : Nuoff9ryHIHVZ976

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://mydbuser1:Nuoff9ryHIHVZ976@cluster0.vljpp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// run এখানে async function নিচ থেকে কল করা হবে  
async function run() {
  try {
    await client.connect();
    const database = client.db("foodMaster");
    const usersCollection = database.collection("users");
    // // create a document to insert
    // const doc = {
    //   name: "Special One",
    //   email: "special@hotmail.com",
    // }
    // const result = await usersCollection.insertOne(doc);
    // console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Running on crud server')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})