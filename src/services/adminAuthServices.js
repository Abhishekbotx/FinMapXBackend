const bcrypt = require('bcrypt');
const OTP = require('../models/otp');
const {EmployeeRepository,AdminAuthRepository} = require('../repository/index');
const { ServiceError, ValidationError, ClientError } = require('../utils/errors/index');
const { ADMIN_JWT_KEY } = require('../config/dotenvConfig');
const { StatusCodes } = require('http-status-codes');
const validator = require("email-validator");
const{ADMIN_FOLDER}=require('../config/dotenvConfig')
const{uploadFile}=require('../utils/fileupload');
const { isFileTypeSupported, createToken } = require('../utils/fileAndtoken');


const employeeRepository = new EmployeeRepository();
const adminAuthRepository=new AdminAuthRepository()


class AdminAuthService{

    async getAllSubAdmin() {
        try {
            
            const response = await adminAuthRepository.getAllAdmins();
            if(!response){
                throw new ServiceError(
                    'Unable to fetch subadmins',
                    'Error in fetching subadmins',
                    StatusCodes.BAD_REQUEST
                );
            }
            return response;
        } catch (error) {
            console.error("Something went wrong in the service layer:", error);
            throw error
        }
    }
    async createSubAdmin(data) {
        try {
            const{fullName,email,password,confirmPassword,contactNumber}=data
            if(password!==confirmPassword){
                throw new ServiceError(
                    'Password not Matching',
                    'Password and confirmPassword not Matching .',
                    StatusCodes.BAD_REQUEST
                );
            }
            // console.log('data in services:',data)
            console.log("before finding email in service");
            const userExists = await adminAuthRepository.getAdminByEmail(email);
            if (userExists) {
                throw new ServiceError(
                    'User Already Present',
                    'User is already registered with this email. Please use a different email.',
                    StatusCodes.BAD_REQUEST
                );
            }
            console.log("after user find");
            const imageSvg = `https://api.dicebear.com/5.x/initials/svg?seed= ${data.fullName}`
            
            console.log('before hashing password')
            const hashedPassword = await bcrypt.hash(password, 10)
            console.log(hashedPassword);

            const user = await adminAuthRepository.createSubAdmin({ fullName:fullName,email:email,password:hashedPassword,contactNumber:contactNumber, image: imageSvg });
            return user;
        } catch (error) {
            console.error("Something went wrong in the service layer:", error);
            throw error
        }
    }
    async deleteSubAdmin(userId) {
        try {
            console.log('userId:',userId)
            const subAdminDetails = await adminAuthRepository.deleteSubAdmin(userId);
            // const subAdminDetails = await adminAuthRepository.getAdminById(userId);
            // if (!subAdminDetails) {
            //     throw new ServiceError(
            //         'SubAdmin Not Found',
            //         'Unable to find SubAdmin.',
            //         StatusCodes.BAD_REQUEST
            //     );
            // }
            // subAdminDetails.active='inActive'
            // subAdminDetails.save()
            return subAdminDetails;
        } catch (error) {
            console.error("Something went wrong in the service layer:", error);
            throw error
        }
    }
    async signIn({email,password}) {
        try {
            if(!email || !password){
                throw new ServiceError(
                    'Validation Error',
                    'fill all details properly.',
                    StatusCodes.BAD_REQUEST
                );
            }
            console.log('after validation');
            const adminDetails = await adminAuthRepository.getAdminByEmail(email);
            if (!adminDetails) {
                throw new ServiceError(
                    'Invalid Credentials',
                    'Email is not registerd as Admin or SubAdmin.',
                    StatusCodes.UNAUTHORIZED
                );
            }
            console.log('before bcrypt');
            const passwordcheck = await bcrypt.compare(password, adminDetails.password)
            console.log('before bcrypt');
            if (!passwordcheck) {
                throw new ServiceError(
                    'Password not Matching',
                    'Password and confirmPassword not Matching .',
                    StatusCodes.UNAUTHORIZED
                );
            }
            
            const payload = { email: adminDetails.email, id: adminDetails._id,role:adminDetails.accountType }
            console.log('beforer token generation');
            const token = createToken(payload, ADMIN_JWT_KEY, '1h');
            console.log('after token generation');
            adminDetails.token =token
            adminDetails.save()

            // console.log(adminDetails)
            // console.log('before returning token');
            return token 
        } catch (error) {
            console.error("Something went wrong in the sign-in process:", error);
            throw error;
        }
    } 
    async signOut(token) {
        try {
            
            const adminDetails = await adminAuthRepository.getAdminByToken(token);
            if (!adminDetails) {
                throw new ServiceError(
                    'Invalid Credentials',
                    'Email is not registerd as Admin or SubAdmin.',
                    StatusCodes.UNAUTHORIZED
                );
            }
            adminDetails.token=''
            

            // console.log(adminDetails)
            // console.log('before returning token');
            return 'adminToken reset successful'
        } catch (error) {
            console.error("Something went wrong in the sign-in process:", error);
            throw error;
        }
    } 

    async getAdminByToken(token) {
        try {

            const Admin =await  adminAuthRepository.getAdminByToken(token)
            console.log('reviews in services',Admin)
            return Admin

        } catch (error) {
            console.log('error in addAsEmployee adminservice:', error);
            throw error;
        }
    }



    // async displayPictureUpdate(userId,displayPicture){
    //     try {
    //         const supportedTypes = ["png","jpg","jpeg"];
    //         const fileType =await  displayPicture.name.split('.').pop().toLowerCase();//extracting filetype
    //         console.log(fileType)
    //         const response =await isFileTypeSupported(fileType,supportedTypes)
    //         if (!response) {
    //             throw new ServiceError(
    //                 'Unsupported file type',
    //                 'Please upload png, jpg or jpeg format only',
    //                 StatusCodes.BAD_REQUEST
    //             )
    //         }


    //     const adminDetails=await adminAuthRepository.getAdminById(userId);
    //     console.log(adminDetails)

    //     const uploadPath = __dirname + "./../utils/uploads/adminProfileImages";
    //     console.log('beforefileupload')
    //     const filePath = await uploadFile(displayPicture, uploadPath);
    //     // userDetails.image = filePath

    //     adminDetails.image= filePath
    //     adminDetails.save()
    //     return filePath
    //     } catch (error) {
    //         throw error
    //     }

    // }
    // async displayPictureUpdate(userId,displayPicture){
    //     try {
    //         const supportedTypes = ["png","jpg","jpeg"];
    //         const fileType =await  displayPicture.name.split('.').pop().toLowerCase();//extracting filetype
    //         console.log(fileType)
    //         const response =await isFileTypeSupported(fileType,supportedTypes)
    //         if (!response) {
    //             throw new ServiceError(
    //                 'Unsupported file type',
    //                 'Please upload png, jpg or jpeg format only',
    //                 StatusCodes.BAD_REQUEST
    //             )
    //         }


    //     const adminDetails=await adminAuthRepository.getAdminById(userId);
    //     console.log(adminDetails)

    //     const uploadPath = __dirname + "./../utils/uploads/adminProfileImages";
    //     console.log('beforefileupload')
    //     const filePath = await uploadFile(displayPicture, uploadPath);
    //     // userDetails.image = filePath

    //     adminDetails.image= filePath
    //     adminDetails.save()
    //     return filePath
    //     } catch (error) {
    //         throw error
    //     }

    // }
    async updateProfile(data){
        try {
            const {fullName,contactNumber,image,token}=data
            const supportedTypes = ["png","jpg","jpeg"];
            const fileType =await  image.name.split('.').pop().toLowerCase();//extracting filetype
            console.log(fileType)
            const response =await isFileTypeSupported(fileType,supportedTypes)
            if (!response) {
                throw new ServiceError(
                    'Unsupported file type',
                    'Please upload png, jpg or jpeg format only',
                    StatusCodes.BAD_REQUEST
                )
            } 
        const adminDetails=await adminAuthRepository.getAdminByToken(token);
        console.log(adminDetails)

        const uploadPath = __dirname + "./../utils/uploads/adminProfileImages";
        console.log('beforefileupload')
        const filePath = await uploadFile(image, uploadPath);
        // userDetails.image = filePath

        adminDetails.image= filePath
        adminDetails.fullName=fullName
        adminDetails.contactNumber=contactNumber
        adminDetails.save()
        return filePath
        } catch (error) {
            throw error
        }

    }
    // async displayPictureUpdate(userId,displayPicture){
    //     try {
    //         const supportedTypes = ["png","jpg","jpeg"];
    //         const fileType =await  displayPicture.name.split('.').pop().toLowerCase();//extracting filetype
    //         console.log(fileType)
    //         const response =await isFileTypeSupported(fileType,supportedTypes)
    //         if (!response) {
    //             throw new ServiceError(
    //                 'Unsupported file type',
    //                 'Please upload png, jpg or jpeg format only',
    //                 StatusCodes.BAD_REQUEST
    //             )
    //         }


    //     const adminDetails=await adminAuthRepository.getAdminById(userId);
    //     console.log(adminDetails)

    //     const uploadPath = __dirname + "./../utils/uploads/adminProfileImages";
    //     console.log('beforefileupload')
    //     const filePath = await uploadFile(displayPicture, uploadPath);
    //     // userDetails.image = filePath

    //     adminDetails.image= filePath
    //     adminDetails.save()
    //     return filePath
    //     } catch (error) {
    //         throw error
    //     }

    // }
}

module.exports=AdminAuthService