const {z} =require('zod')
const validator=require('validator')


const customerCheckInSchema=z.object({
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
    .max(40,{message:'email must be maximum of 30 characters'}),

    gender:z.
    string({required_error:"gender is required"})
    .trim()
    .min(4,{message:'gender must be minimum of 4 characters'})
    .max(10,{message:'gender must be maximum of 12 characters'}),

    dateOfBirth:z.
    string({required_error:"dateOfBirth is required"})
    .trim()
    .min(10,{message:'dateOfBirth must be minimum of 10 characters'})
    .max(10,{message:'dateOfBirth must be maximum of 10 characters'}),

    address1:z.
    string({required_error:"address1 is required"})
    .trim()
    .min(6,{message:'address1 must be minimum of 6 characters'})
    .max(50,{message:'address1 must be maximum of 50 characters'}),

    address2:z.
    string({required_error:"address1 is required"})
    .trim()
    .min(6,{message:'address2 must be minimum of 6 characters'})
    .max(50,{message:'address2 must be maximum of 50 characters'}),

    pincode:z.
    string({required_error:"pincode is required"})
    .trim()
    .min(6,{message:'pincode must be minimum of 6 characters'})
    .max(50,{message:'pincode must be maximum of 50 characters'}),

    state:z.
    string({required_error:"state is required"})
    .trim()
    .min(6,{message:'state must be minimum of 6 characters'})
    .max(50,{message:'state must be maximum of 50 characters'}),



    pancard:z.
    string({required_error:"pancard is required"})
    .trim()
    .min(10,{message:'pancard must be minimum of 6 characters'})
    .max(10,{message:'pancard must be maximum of 50 characters'}),

    guaranterPancard:z.
    string({required_error:"guaranterPancard is required"})
    .trim()
    .min(10,{message:'guaranterPancard must be minimum of 6 characters'})
    .max(10,{message:'guaranterPancard must be maximum of 50 characters'}),

    aadharcard:z.
    string({required_error:"aadharcard is required"})
    .trim()
    .min(10,{message:'aadharcard must be minimum of 10 characters'})
    .max(12,{message:'aadharcard must be maximum of 12 characters'}),

    contactNumber:z.
    string({required_error:"aadharcard is required"})
    .refine(validator.isMobilePhone,{message:'Invalid phoneNumber, Please write a valid phoneNumber'}),

    employmentType:z.
    string({required_error:"employmentType is required"})
    .trim()
    .min(3,{message:'employmentType must be minimum of 6 characters'})
    .max(15,{message:'employmentType must be maximum of 50 characters'}),

    employerName:z.
    string({required_error:"employerName is required"})
    .trim()
    .min(3,{message:'employerName must be minimum of 6 characters'})
    .max(15,{message:'employerName must be maximum of 50 characters'}),

    monthlyIncome:z.
    number({required_error:"monthlyincome is required"})
    .min(1000,"a minimum of 1000 is required"),







    


})

module.exports=customerCheckInSchema