const express = require("express");
const dd = require("./database/data");
const app=express();
const cors=require("cors");
require('dotenv').config();
const {getuser, setuser} = require("./auth")
const mongoose = require("mongoose");
const path = require("path");
const fs = require('fs');




app.use(express.json());
// Serve frontend static files
app.use(express.static(path.resolve(__dirname, "/frontend/my-project/dist")));
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: process.env.porturl || "http://localhost:5173",  //changed this for deployment so it will not work in locahost 
    credentials:true,
}));




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
  

// const indexPath = path.resolve(__dirname, "../2nd/frontend/my-project/dist/index.html");
// console.log("Serving frontend from:", indexPath);
// console.log("Exists?", fs.existsSync(indexPath));

// Handle unmatched routes (for React router)
app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend/my-project/dist/index.html"));
});


// app.use(express.static(path.resolve(__dirname, "frontend/my-project/dist")));


// app.get("/*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "frontend/my-project/dist/index.html"));
// });


// **Important**: Serve React app for all other routes (must be the last route)
const PORT = process.env.PORT || 9000;

app.listen(PORT, (req,res)=>{
    console.log("server is running properly");
});