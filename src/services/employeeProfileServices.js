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
    async profileUpdate(userId, data) {
        try {
            const userDetails = await employeeRepository.getUserById(userId);
            const profileId = userDetails.additionalDetails;
            const profileDetails = await employeeProfileRepository.findProfileById(profileId);
            const {
                firstName,
                lastName,
                gender = "",
                dateOfBirth = "",
                contactNumber = "",
                address = "",
                emergencyContact = "",
                employmentStatus = ""
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
            await userDetails.save();

            profileDetails.dateOfBirth = dateOfBirth;
            profileDetails.contactNumber = contactNumber;
            profileDetails.gender = gender;
            profileDetails.address = address;
            profileDetails.employmentStatus = employmentStatus;
            profileDetails.emergencyContact = parseInt(emergencyContact);

            return { profileDetails };
        } catch (error) {
            console.error('Error in profile services:', error);
            throw error
        }
    }


    async displayPictureUpdate(userId, displayPicture) {
        try {
            const supportedTypes = ["png", "jpg", "jpeg"];
            const fileType = await displayPicture.name.split('.').pop().toLowerCase();//extracting filetype
            console.log(fileType)
            const response = await isFileTypeSupported(fileType, supportedTypes)
            if (!response) {
                throw new ServiceError(
                    'Unsupported file type',
                    'Please upload png, jpg or jpeg format only',
                    StatusCodes.BAD_REQUEST
                )
            }

            const userDetails = await employeeRepository.getUserById(userId);
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
}

module.exports = ProfileServices;
