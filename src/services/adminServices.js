const { Employee, News } = require('../models/index')
const { ServiceError, ClientError } = require('../utils/errors/index')
const { StatusCodes } = require('http-status-codes')
const { AdminRepository } = require('../repository/index')
const { employeeAccepted } = require('../mail/employeeAccepted')
const mailsender = require('../utils/nodemailer')
const { employeeDeclined } = require('../mail/employeeDeclined')
const { Review } = require('../models/index')
const { uploadFile } = require('../utils/fileupload')
const {EmployeeRepository}=require('./../repository/index')
const news = require('../models/news')
const createMulterInstance = require('../utils/multer')
const employeeRepository = new EmployeeRepository
const adminRepository = new AdminRepository
class AdminService {
    async getEmployeee() {
        try {
            const employees = await employeeRepository.getAllEmployeeTypeEmployeees();
            if (!employees) {
                throw new ServiceError(
                    'No user Found',
                    'Unable to to fetch any user',
                    StatusCodes.UNAUTHORIZED
                );
            }
            return employees
        } catch (error) {
            console.log('error in getemployee adminservice:', error)
            throw error
        }
    }

    async getUserEmployeee(){
        try {
            const employees = await employeeRepository.getAllUserTypeEmployeees();
            if (!employees) {
                throw new ServiceError(
                    'No user Found',
                    'Unable to to fetch any user',
                    StatusCodes.UNAUTHORIZED
                );
            }
            return employees
        } catch (error) {
            console.log('error in getemployee adminservice:', error)
            throw error
        }
    }
    async getActiveEmployees(){
        try {
            const employees = await employeeRepository.getActiveEmployees();
            if (!employees) {
                throw new ServiceError(
                    'No Inactive employees Found',
                    'Unable to to fetch any user',
                    StatusCodes.UNAUTHORIZED
                );
            }
            return employees
        } catch (error) {
            console.log('error in getInactiveEmployees adminservice:', error)
            throw error
        }
    }
    async getInactiveEmployees(){
        try {
            const employees = await employeeRepository.getInactiveEmployees();
            if (!employees) {
                throw new ServiceError(
                    'No Inactive employees Found',
                    'Unable to to fetch any user',
                    StatusCodes.UNAUTHORIZED
                );
            }
            return employees
        } catch (error) {
            console.log('error in getInactiveEmployees adminservice:', error)
            throw error
        }
    }

    async activateEmployeeActiveStatus(userId){
        try {
            console.log('fetching user in adminservice:',userId)
            const employee = await employeeRepository.getUserById(userId);
            const dateOfJoining=new Date();
            console.log('employee:',employee)
            if (!employee) {
                throw new ServiceError(
                    'No user Found',
                    'Unable to to fetch any user',
                    StatusCodes.UNAUTHORIZED
                );
            }
            employee.active='active'
            employee.dateOfJoining=dateOfJoining.toLocaleDateString()
            await employee.save()
            return 'Employee status changed to InActive successfully'
        } catch (error) {
            console.log('error in getemployee adminservice:', error)
            throw error
        }
    }
    async deactivateEmployeeActiveStatus(userId){
        try {
            console.log('fetching user in adminservice:',userId)
            const employee = await employeeRepository.getUserById(userId);
            console.log('employee:',employee)
            if (!employee) {
                throw new ServiceError(
                    'No user Found',
                    'Unable to to fetch any user',
                    StatusCodes.UNAUTHORIZED
                );
            }
            employee.active='inActive'
            await employee.save()
            return 'Employee status changed to InActive successfully'
        } catch (error) {
            console.log('error in getemployee adminservice:', error)
            throw error
        }
    }



    async addAsEmployee(email) {
        try {
            const userDetails = await employeeRepository.getUserByEmail(email);
            const { firstName, lastName } = userDetails
            const fullName = `${firstName} ${lastName}`
            console.log('userDetails:', userDetails);
            if (!userDetails) {
                throw new ServiceError(
                    'No user Found',
                    'Unable to fetch any user',
                    StatusCodes.UNAUTHORIZED
                );
            }
            if (userDetails.accountType == 'User') {
                userDetails.accountType = 'Employee';
                userDetails.active= 'active'
                mailsender(email, 'User changed to employee successfully', employeeAccepted(fullName, email))
                await userDetails.save(); 
                return userDetails.accountType; 
            } else {
                return 'AlreadyEmployee'; 
            }
        } catch (error) {
            console.log('error in addAsEmployee adminservice:', error);
            throw error;
        }
    }
    async declineEmployee(email) {
        try {
            const userDetails = await employeeRepository.deleteUserByEmail(email);
            const { firstName, lastName } = userDetails
            const fullName = `${firstName} ${lastName}`
            mailsender(email, 'Employee Request Declined', employeeDeclined(fullName, email))
        } catch (error) {
            console.log('error in addAsEmployee adminservice:', error);
            throw error;
        }
    }
    async getReviews() {
        try {

            const Reviews =await  adminRepository.getAllReviews()
            console.log('reviews in services',Reviews)
            return Reviews

        } catch (error) {
            console.log('error in addAsEmployee adminservice:', error);
            throw error;
        }
    }

    
    async addReview({ name, profession, review, rating, reviewPicture }) {
        try {

            // const uploadPath = __dirname + "./../utils/uploads/reviewImage";
            console.log('beforefileupload')
            // const filePath=await createMulterInstance('../../public/uploads/reviewImage')
            const filePath = await uploadFile(reviewPicture, 'reviewImage');
            if(!filePath){
                throw new ServiceError(
                    'imageUpload Error',
                    'Unable to upload image',
                    StatusCodes.BAD_REQUEST
                )
            }
            // console.log('Image in services:',Image)
            const reviewImage =filePath
            const Review =await adminRepository.addReview({
                name, profession, review, rating, image: reviewImage
            });
            return Review

        } catch (error) {
            console.log('error in addAsEmployee adminservice:', error);
            throw error;
        }
    }
    async deleteReview(reviewId) {
        try {

            const Review =await adminRepository.deleteReview(reviewId);
            return Review

        } catch (error) {
            console.log('error in addAsEmployee adminservice:', error);
            throw error;
        }
    }
    async updateReview(data) {
        try {
            const { reviewId, name, profession, review, rating, reviewPicture } = data
            const uploadPath = __dirname + "./../utils/uploads/reviewImage";
            console.log('beforefileupload')
            const filePath = await uploadFile(reviewPicture, uploadPath);
            if(!filePath){
                throw new ServiceError(
                    'imageUpload Error',
                    'Unable to upload image',
                    StatusCodes.BAD_REQUEST
                )
            }

            const reviewImage = filePath
            const reviewDetails = await Review.findById(reviewId)
            reviewDetails.name = name
            reviewDetails.profession = profession,
                reviewDetails.review = review,
                reviewDetails.image = reviewImage,
                reviewDetails.rating = rating,
                reviewDetails.save()

            // const Review = adminRepository.updateReview();
            return reviewDetails

        } catch (error) {
            console.log('error in updateReview adminservice:', error);
            throw error;
        }
    }

    async getNews() {
        try {

            const News = await adminRepository.getAllNews()
            return News

        } catch (error) {
            console.log('error in addAsEmployee adminservice:', error);
            throw error;
        }
    }

    async createNews({ newsImage,editorImage,editorName,newsName,description,newsDate }) {

        try {

            const newsImagefilePath = await uploadFile(newsImage, 'newsImage');
            if(!newsImagefilePath){
                throw new ServiceError(
                    'newsImageUpload Error',
                    'Unable to upload newsImage',
                    StatusCodes.BAD_REQUEST
                )
            }
            
            const newsPicture=newsImagefilePath


            const editorImagefilePath = await uploadFile(editorImage, 'editorImages');
            const editorPicture=editorImagefilePath
            // console.log('beforefileupload')
            // const editorfilePath = await uploadFile(editorImage, editoruploadPath);
            if(!editorImagefilePath){
                throw new ServiceError(
                    'editorImageUpload Error',
                    'Unable to upload editorImage',
                    StatusCodes.BAD_REQUEST
                )
            }
            // console.log('Image in services:',Image)
            const News =await  adminRepository.addNews({
                editorName, newsName, description, newsImage:newsPicture, 
                editorImage: editorPicture,newsDate:newsDate
            });
            return News

        } catch (error) {
            console.log('error in createNews adminservice:', error);
            throw error;
        }
    }

    async deleteNews(newsId) {
        try {
            console.log('newsId in service layer:',newsId)
            const NewsId = adminRepository.deleteNews(newsId);
            return NewsId

        } catch (error) {
            console.log('error in addAsEmployee adminservice:', error);
            throw error;
        }
    }

}

module.exports = AdminService