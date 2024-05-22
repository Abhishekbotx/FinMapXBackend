const mongoose=require('mongoose')
const Test=new mongoose.Schema({
name:{
    type:String
},
address:{
    type:String
}
})

module.exports=mongoose.model('Test',Test)