const mongoose = require("mongoose");
const EmployeeProfileSchema = new mongoose.Schema({
	gender: {
		type: String,
		enum: ['Male', 'Female', 'Transgender'],
	},
	
	dateOfBirth: {
		type: String,
	},
	
	contactNumber: {
		type: String,
		trim: true,
	},
	address: {
		type: String,
	},
	emergencyContact: {
		type:Number
	},
	employmentStatus: {
		type: String,
		enum: ['Full-time', 'Part-time', 'Contractor'],
	},
});




module.exports = mongoose.model("EmployeeProfileSchema", EmployeeProfileSchema);
 