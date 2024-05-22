const {z} =require('zod')
const MAX_FILE_SIZE = 4*1000*1000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const reviewSchema=z.object({
    // Picture: z.any({required_error:"name is required"}),
    // .refine(
    //     (file) => {
    //         if (!file) return false; 
    //         console.log('filesize:',file.size)
    //         return file.size 
    //     },
    //     {
    //         message: "Invalid file. Max image size is 5MB and supported formats are .jpg, .jpeg, .png, and .webp.",
    //         path: ["Picture"]
    //     }
    // ).optional(),
  
   


    name:z.
    string({required_error:"name is required"})
    .trim()
    .min(3,{message:'name must be minimum of 3 characters'})
    .max(20,{message:'name must be maximum of 20 characters'}),

    profession:z.
    string({required_error:"profession is required"})
    .trim()
    .min(5,{message:'profession must be minimum of 5 characters'})
    .max(20,{message:'profession must be maximum of 20 characters'}),

    review:z.
    string({required_error:"review is required"})
    .trim()
    .min(10,{message:'review must be minimum of 10 characters'})
    .max(200,{message:'review must be maximum of 30 characters'}),

    rating:z.
    string({required_error:"rating is required"})
    .max(5,{message:'rating must be maximum of 3 characters'}),


})

module.exports=reviewSchema