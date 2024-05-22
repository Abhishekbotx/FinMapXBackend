const mongoose=require("mongoose");
const mailSend=require('../utils/nodemailer')
const emailTemplate=require('../mail/otpVerification')


const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300 // 5 minutes in seconds
    }
});

async function sendVerification(email,otp){
    try {
        const message =await mailSend(
            email,
            "OTP Verification",
            emailTemplate(otp)
        );
        console.log('Email sent successfully:',message)
    } catch (error) {
        console.log('Erorr while sending mail ')
        throw error
    }

}

otpSchema.pre('save',async function(next){
     sendVerification(this.email,this.otp)
    next()
})


module.exports=mongoose.model('OTP',otpSchema)