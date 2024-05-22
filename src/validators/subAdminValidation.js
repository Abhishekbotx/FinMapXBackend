const {z} =require('zod')

const SubAdminValidationSchema=z.object({
    fullName:z.
    string({required_error:"fullName is required"})
    .trim()
    .min(3,{message:'fullName must be minimum of 3 characters'})
    .max(40,{message:'fullName must be maximum of 40 characters'}),

 
    email:z.
    string({required_error:"email is required"})
    .trim()
    .email()
    .min(8,{message:'email must be minimum of 8 characters'})
    .max(30,{message:'email must be maximum of 30 characters'}),

    password:z.
    string({required_error:"password is required"})
    .trim()
    .min(8,{message:'password must be minimum of 8 characters'})
    .max(20,{message:'password must be maximum of 30 characters'}),

    confirmPassword:z.
    string({required_error:"confirm password is required"})
    .trim()
    .min(7,{message:'confirmPassword must be minimum of 6 characters'})
    .max(30,{message:'confirmPassword must be maximum of 30 characters'}),

    contactNumber:z.
    string({required_error:"contactNumber  is required"})
    .trim()
    .min(10,{message:'contactNumber must be minimum of 10 characters'})
    .max(10,{message:'contactNumber must be maximum of 10 characters'}),

})

module.exports=SubAdminValidationSchema