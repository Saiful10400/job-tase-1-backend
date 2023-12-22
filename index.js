const express =require("express")
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors=require("cors")
const port=process.env.port || 5000
const app=express()
require('dotenv').config()


// all middlewares is form here.

app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.qe6izo7.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
 

// all api from here.

app.get("/", async(req,res)=>{
    res.send(`this server is running on port ${port}`)
})

// Mongodb's all crud operations.

const database=client.db("Task_manager")

// user adding and managerment.

const userCollection=database.collection("all user")

// add a user.
app.post("/addAUser", async(req,res)=>{
    const data=req.body
    const result= await userCollection.insertOne(data)
    res.send(result)
})
// get a user with E-mail
app.post("/getAUser",async(req,res)=>{
    const email=req.body.email
    const query={email:email}
    const result=await userCollection.findOne(query)
    res.send(result)
})
// get all user.
app.get("/getAllUser",async(req,res)=>{
    const result=await userCollection.find().toArray()
    res.send(result)
})


// task adding and management.
const taskCollection=database.collection("all task")
// post a task.
app.post("/postATask",async(req,res)=>{
    const data=req.body
    const result=await taskCollection.insertOne(data)
    res.send(result)
})
// get a all task.
app.get("/getAllTask",async(req,res)=>{
    const result=await taskCollection.find().toArray()
    res.send(result)
})
// get all task by user email.
app.post("/getAllTaskByEmail",async(req,res)=>{
    const email=req.body.email
    const query={email:email}
    const result=await taskCollection.find(query).toArray()
    res.send(result)
})
// update a task paramitre.
app.post("/updateATask",async(req,res)=>{
  const id=req.body.id
  const data=req.body.data
  const newData={
    $set:{
      status:data
    }
  }
  const query={_id:new ObjectId(id)}
  const result=await taskCollection.updateOne(query,newData)
  res.send(result)
})
// delete a task.
app.post("/deleteATask",async(req,res)=>{
  const id=req.body.id
  const query={_id:new ObjectId(id)}
  const result=await taskCollection.deleteOne(query)
  res.send(result)
})
// update a task.
app.post("/updateATaskMultipleField" ,async(req,res)=>{
  const {id,title,description,date,time,status,priority}=req.body
  const query={_id:new ObjectId(id)}
  const newdata={
    $set:{
      title,description,date,time,status,priority
    }
  }
  
  const result=await taskCollection.updateOne(query,newdata)
  res.send(result)
})

 
// all api list end..................................
 

    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




// app listener.
app.listen(port,()=>{
    console.log(`this server is running on http://localhost:${port}`)
})