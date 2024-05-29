const mongoose=require("mongoose");

const checkInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    message:{
        type:String,
    },
   

});

module.exports=mongoose.model('CheckIn',checkInSchema)