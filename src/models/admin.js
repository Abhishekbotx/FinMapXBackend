const mongoose=require("mongoose");

const adminSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    contactNumber:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    accountType:{
        type: String,
        enum: ["Admin","SubAdmin"],
        default:"SubAdmin",
        required: true,   
    },
    image:{
        type:String,
        required:true
    },
    active:{
        type:String,
        enum: ["active","inActive"],
        default:"active",
    },
    token:{
        type:String,
        default:''
    }


});

module.exports=mongoose.model('Admin',adminSchema)