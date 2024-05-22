const mongoose = require("mongoose");

const customerProfileSchema = new mongoose.Schema({
	firstName:{
		type: String,
        required:true
	},
	middleName:{
		type: String,
	},
	lastName:{
		type: String,
        required:true
	},
	email:{
		type: String,
        required:true,
		unique:true
	},
	gender: {
		type: String,
		required:true,
		enum: ['Male', 'Female', 'Transgender'],
	},
	dateOfBirth: {
		type: String,
		required:true
	},
	address1: {
		type: String,
		trim: true,
		required:true,
	},
	address2: {
		type: String,
		trim: true,
		required:true,
	},
	pincode: {
		type: Number,
		trim: true,
		required:true,
	},
	state:{
		type: String,
		trim: true,
		required:true,
	},
	pancard: {
		type: String,
		trim: true,
		required:true,
	},
	guaranterPancard: {
		type: String,
		trim: true,
	},
	aadharcard: {
		type: String,
		trim: true,
		required:true,
	},
	contactNumber: {
		type: String,
		trim: true,
		required:true,
	},
	employmentType: {
		type: String,
		trim: true,
		required:true,
		enum: ['Job', 'Business', 'Govt Employee'],
	},
	employerName: {
		type: String,
		trim: true,
	},
	monthlyIncome: {
		type: Number,
		trim: true,
	},
	adderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
	
},{
    timestamps: true 
});


module.exports = mongoose.model("customerProfile", customerProfileSchema);
