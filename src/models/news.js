const mongoose=require('mongoose')
const newsSchema=new mongoose.Schema({
editorName:{
    type:String,
    required:true
},   
newsName:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
newsImage:{
    type: String,
    required:true
},
editorImage:{
    type: String,
    required:true
},
newsDate:{
    type: String,
    required:true
}
}, {
    timestamps: true 
})

module.exports=mongoose.model('News',newsSchema)