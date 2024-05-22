const mongoose=require('mongoose')
const reviewSchema=new mongoose.Schema({
name:{
    type:String,
    required:true
},
profession:{
    type:String,
    required:true
},
review:{
    type:String,
    required:true
},
rating:{
    type: Number, // Using Number type for rating
    min: 0,      // Minimum value for the rating
    max: 5,
    required:true
},
image:{
    type: String,
    required:true
}
}, {
    timestamps: true 
})

module.exports=mongoose.model('Review',reviewSchema)