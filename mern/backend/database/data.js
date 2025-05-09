const mongoose = require("mongoose");

const feddbackdetails=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    feedback:{
        type:String,
        required:true,
    },
},
{
    timestamps:true
},);

const dd=mongoose.model("details",feddbackdetails);

module.exports=dd;