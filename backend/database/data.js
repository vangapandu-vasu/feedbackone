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
    timestamps:{
        timestamps:{type:Date}
    }
},
{
    timestamps:true
},);

const dd=model.mongoose("details",feddbackdetails);

export default dd;