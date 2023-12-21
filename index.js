const express =require("express")
const cors=require("cors")
const port=process.env.port || 5000
const app=express()


// all middlewares is form here.

app.use(cors())
app.use(express.json())


// all api from here.

app.get("/", async(req,res)=>{
    res.send(`this server is running on port ${port}`)
})





// app listener.
app.listen(port,()=>{
    console.log(`this server is running on http://localhost:${port}`)
})