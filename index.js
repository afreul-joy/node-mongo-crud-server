const express = require('express')
const { MongoClient } = require('mongodb');
const cors = require('cors')
const ObjectId= require('mongodb').ObjectId

const app = express()
const port = 5000

//middleware 
app.use(cors())
app.use(express.json());

//user : mydbuser1
//pass : Nuoff9ryHIHVZ976


const uri = "mongodb+srv://mydbuser1:Nuoff9ryHIHVZ976@cluster0.vljpp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// run এখানে async function নিচ থেকে কল করা হবে  
async function run() {
  try {
    await client.connect();
    const database = client.db("foodMaster");
    const usersCollection = database.collection("users");
    // get api 
    app.get('/users', async(req, res) =>{
      const cursor = usersCollection.find({});
      const users = await cursor.toArray();
      res.send(users);
    })

    // POST method route
    app.post('/users', async (req, res) => {
      const newUser = req.body;
       const result = await usersCollection.insertOne(newUser);
      // console.log("got new user", req.body);
      // console.log('added user',result);
      res.json(result)
    })
    // delete api
    app.delete('users/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      console.log("deteling user with id", result);
      res.json(result)
    })

  } finally {
    // await client.close(); 
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Running on crud server')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})