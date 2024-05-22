const bcrypt = require('bcrypt');
const otpgenerator = require('otp-generator');
const OTP = require('../models/otp');
const {EmployeeRepository} = require('../repository/index');
const { ServiceError, ValidationError, ClientError } = require('../utils/errors/index');
const { JWT_KEY } = require('../config/dotenvConfig');
const { StatusCodes } = require('http-status-codes');
const validator = require("email-validator");
const { EmployeeProfile } = require('../models');
const { verifyToken, createToken } = require('../utils/fileAndtoken');

const employeeRepository = new EmployeeRepository();

class UserService {
    async createUser(data) {
        try {
            const validEmail = validator.validate(data.email);
            console.log(validEmail)
            if (!validEmail) {
                throw new ServiceError(
                    'Invalid Email',
                    'You are attempting to login with invalid email',
                    StatusCodes.NOT_FOUND);
            }

            if(data.password.length<=7){
                throw new ServiceError(
                    'Password Too Short',
                    'Password length 8 or more required',
                    StatusCodes.NOT_FOUND);
            }

            const userExists = await employeeRepository.getUserByEmail(data.email);
            if (userExists) {
                throw new ServiceError(
                    'Email Already Registered',
                    'An Account is already associated with this email. Please use a different email.',
                    StatusCodes.BAD_REQUEST
                );
            }

            const imageSvg = `https://api.dicebear.com/5.x/initials/svg?seed= ${data.firstName} ${data.lastName}`
            const otp = await OTP.findOne({ email: data.email }).sort({ createdAt: -1 }).limit(1);

            console.log('otp:', otp)
            if (!otp || otp.otp !== data.otp) {
                throw new ServiceError(
                    'Invalid OTP',
                    'The OTP provided is invalid or has expired.',
                    StatusCodes.BAD_REQUEST
                );
            }
            console.log('before hashing password')
            const hashedPassword = await bcrypt.hash(data.password, 10)
            console.log(hashedPassword);


            const profileDetails = await EmployeeProfile.create({

                gender: null,
                dateOfBirth: null,
                contactNumber: null,
                address: null,
                emergencyContact: null,
                employmentStatus: null

            })
            


            const user = await employeeRepository.createUser({ ...data, password: hashedPassword, image: imageSvg, additionalDetails: profileDetails });
            return user;
        } catch (error) {
            console.error("Something went wrong in the service layer:", error);
            throw error
        }
    }

    async signIn(data) {
        try {
            const userDetails = await employeeRepository.getUserByEmail(data.email);

            // console.log('userId', user)
            if (!userDetails) {
                throw new ServiceError(
                    'Invalid Credentials',
                    'Invalid email or password.',
                    StatusCodes.UNAUTHORIZED
                );
            }
            const passwordcheck = await bcrypt.compare(data.password, userDetails.password)
            if (!passwordcheck) {
                throw new ServiceError(
                    'Password not Matching',
                    'Password and confirmPassword not Matching .',
                    StatusCodes.UNAUTHORIZED
                );
            }

            const isActive=userDetails.active
            if(isActive!=='active'){
                throw new ServiceError(
                    'Profile Inactive',
                    'Your Profile is Inactive, contact admin for setting it active .',
                    StatusCodes.UNAUTHORIZED
                );
            }
            const payload = { email: userDetails.email, id: userDetails._id, }
            const token = await createToken(payload, JWT_KEY, '1h');
            userDetails.token = token;
            await userDetails.save();

            console.log(token)
            return token
        } catch (error) {
            console.error("Something went wrong in the sign-in process:", error);
            throw error;
        }
    }
    async cutomerCheckInService(data) {
        try {

            const customer = await employeeRepository.addCustomerData(data)
            return customer
        } catch (error) {
            console.error("Something went wrong in the addEmployees in process:", error);
            throw error;
        }
    }


    async createOtp(email) {

        try {
            let otp = otpgenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });

            let result = await OTP.find({ email: email, otp: otp });

            while (result.length > 0) {
                otp = otpgenerator.generate(6, {
                    upperCaseAlphabets: false,
                    lowerCaseAlphabets: false,
                    specialChars: false
                });
                result = await OTP.find({ email: email, otp: otp });
            }
            console.log('no result found', result)
            const payload = {
                email, otp
            }
            const otpBody = await OTP.create(payload)
            return otpBody

        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error
        }
    }



}

module.exports = UserService;