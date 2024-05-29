const { ClientError } = require('../utils/errors/index');
const { StatusCodes } = require('http-status-codes');
const { EmployeeRepository, EmployeeProfileRepository } = require('../repository/index');
const { FOLDER } = require('../config/dotenvConfig')
const ServiceError = require('../utils/errors/service-error');
const {uploadFile}=require('../utils/fileupload');
const { isFileTypeSupported } = require('../utils/fileAndtoken');
const employeeRepository = new EmployeeRepository();
const employeeProfileRepository = new EmployeeProfileRepository();

class ProfileServices {
    async profileUpdate( data) {
        try {
            console.log('data in employee services:',data);
            const userDetails = await employeeRepository.getUserByEmail(data.email);
            
            const {
                firstName,
                lastName,
                dateOfBirth = "",
                contactNumber = "",
                address = "",
                emergencyContact = "",
                employmentStatus = "",
                gender='',
                employmentPosition='',
            } = data;

            if (!firstName || !lastName) {
                throw new ClientError(
                    'ClientError',
                    'First name or last name cannot be null',
                    'Please fill first name and last name properly',
                    StatusCodes.BAD_REQUEST
                );  
            }   

            userDetails.firstName = firstName; 
            userDetails.lastName = lastName;
            
            userDetails.dateOfBirth = dateOfBirth;
            userDetails.contactNumber = contactNumber;
            userDetails.gender = gender;
            userDetails.address = address;
            userDetails.employmentStatus = employmentStatus;
            userDetails.emergencyContact = parseInt(emergencyContact);
            await userDetails.save();
            userDetails.password='heyhelo'

            return { userDetails };
        } catch (error) {
            console.error('Error in profile services:', error);
            throw error
        }
    }


    async displayPictureUpdate(email, displayPicture) {
        try {
            const supportedTypes = ["png", "jpg", "jpeg"];
            const fileType = await displayPicture.name.split('.').pop().toLowerCase();
            console.log(fileType)
            const response = await isFileTypeSupported(fileType, supportedTypes)
            if (!response) {
                throw new ServiceError(
                    'Unsupported file type',
                    'Please upload png, jpg or jpeg format only',
                    StatusCodes.BAD_REQUEST
                )
            }

            const userDetails = await employeeRepository.getUserByEmail(email);
            console.log(userDetails)





            const uploadPath = __dirname + "./../utils/uploads/employeeProfileImages";
            console.log('beforefileupload')
            const filePath = await uploadFile(displayPicture, uploadPath);
            userDetails.image = filePath
            userDetails.save()
            return filePath
        } catch (error) {
            throw error
        }

    }

    async getEmployee(email) {
        try {
            console.log('email in services',email);
            const employee =await employeeRepository.getUserByEmail(email)
            if(!employee){
                throw new ServiceError(
                    'No employee found',
                    'no employee found with this email',
                    StatusCodes.BAD_REQUEST
                )
            }
            console.log('employee in services',employee)
            return employee

        } catch (error) {
            console.log('error in addAsEmployee adminservice:', error);
            throw error;
        }
    }

}

module.exports = ProfileServices;
