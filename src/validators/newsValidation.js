const {z} =require('zod')
const newsSchema=z.object({
  
    editorName:z.
    string({required_error:"editorName is required"})
    .trim()
    .min(3,{message:'editorName must be minimum of 3 characters'})
    .max(20,{message:'editorName must be maximum of 20 characters'}),

    newsName:z.
    string({required_error:"newsName is required"})
    .trim()
    .min(3,{message:'newsName must be minimum of 3 characters'})
    .max(50,{message:'newsName must be maximum of 20 characters'}),

    newsDate:z.
    string({required_error:"date is required"})
    .trim(),

    description:z.
    string({required_error:"description is required"})
    .trim()
    .min(50,{message:'description must be minimum of 50 characters'})
    .max(5000,{message:'description must be maximum of 5000 characters'}),


})

module.exports=newsSchema