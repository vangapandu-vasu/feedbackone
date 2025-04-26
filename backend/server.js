const express = require("express");
const port = 9000;
const dd = require("./database/data");
const app=express();
const cors=require("cors");
require('dotenv').config();
const {getuser, setuser} = require("./auth")
const mongoose = require("mongoose");


app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));
app.use(express.urlencoded({extended:true}));



mongoose.connect(process.env.mongo_url)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
  

  app.post("/done",async(req,res)=>{
    const body = req.body;
    const {name,email,feedback}=req.body;
    const check=await dd.findOne({email});
    if(!check){
        const user=await dd.create({
            name:body.name,
            email:body.email,
            feedback:body.feedback,
        });
        console.log(user)
        return res.send("success");
    }
    else{
        return res.send("already exists");
    }

});

app.get("/admin", async (req, res) => {
    try {
      const allData = await dd.find({});
      res.json(allData);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  });
  


app.listen(port, (req,res)=>{
    console.log("server is running properly");
});