const mongoose=require('mongoose')
const mailSend=require('../utils/nodemailer');
const { newUserRegistration } = require('../mail/newUserRegistration');
const { accountCreatedPendingApproval } = require('../mail/accountCreated');
const employeeSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,'First name is required Abhishek'],

    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },

    password: {
        type: String,
        required: true,
        
    },
   
    accountType: {
        type: String,
        enum: ["Employee","User"],
        required: true,
        default:"User"
    },
    active: {
        type: Boolean,
        default: true,
    }, 
    token: {
        type: String,
    },
    
    resetPasswordExpires: {
        type: Date,
    },
    image: {
        type: String,
        required:true
        
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile",
    },
    active:{
        type:String,
        enum: ["active","inActive"],
        default:"inActive",
    },
    dateOfJoining:{
        type:String,

    }
})

async function sendVerificationEmail(email, subject,message) {

	try {
		const mailResponse =await  mailSend(
            email,
			subject,
            message
        );
        console.log("Email sent successfully");
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}

employeeSchema.pre("save", async function (next) {
	console.log("New document saved to database");

	if (this.isNew) {
        sendVerificationEmail("abhishekbotx@gmail.com", "Account Created",accountCreatedPendingApproval(`${this.firstName} ${this.lastName}`,this.email))
        sendVerificationEmail(this.email, "Account Creation", newUserRegistration(`${this.firstName} ${this.lastName}`,this.email))
        

	}
	next();
});

module.exports=mongoose.model('Employee',employeeSchema)