const {z} =require('zod')


const EmployeeSignupSchema=z.object({
    firstName:z.
    string({required_error:"firstName is required"})
    .trim()
    .min(3,{message:'FirstName must be minimum of 3 characters'})
    .max(20,{message:'FirstName must be maximum of 20 characters'}),

    lastName:z.
    string({required_error:"lastName is required"})
    .trim()
    .min(2,{message:'lastName must be minimum of 3 characters'})
    .max(20,{message:'lastName must be maximum of 20 characters'}),

    email:z.
    string({required_error:"email is required"})
    .trim()
    .email()
    .min(8,{message:'email must be minimum of 6 characters'})
    .max(30,{message:'email must be maximum of 30 characters'}),

    password:z.
    string({required_error:"password is required"})
    .trim()
    .min(6,{message:'password must be minimum of 6 characters'})
    .max(20,{message:'password must be maximum of 30 characters'}),

    confirmPassword:z.
    string({required_error:"confirm password is required"})
    .trim()
    .min(6,{message:'confirmPassword must be minimum of 6 characters'})
    .max(30,{message:'confirmPassword must be maximum of 30 characters'}),

    otp:z.
    number({required_error:'otp is required'})


})

module.exports=EmployeeSignupSchema