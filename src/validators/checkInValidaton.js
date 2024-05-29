const {z} =require('zod')
const validator=require('validator')


const CheckInSchema=z.object({
    name:z.
    string({required_error:"name is required"})
    .trim()
    .min(3,{message:'name must be minimum of 5 characters'})
    .max(30,{message:'FirstName must be maximum of 30 characters'}),

    email:z.
    string({required_error:"email is required"})
    .email()
    .min(6,{message:'email must be minimum of 6 characters'})
    .max(40,{message:'email must be maximum of 30 characters'}),

    
    message:z.
    string({required_error:"message is required"})
    .trim()
    .min(20,{message:'message must be minimum of 20 characters'})
    .max(500,{message:'message must be maximum of 20 characters'}),
})

module.exports=CheckInSchema