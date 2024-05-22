const { StatusCodes } = require("http-status-codes")
const{AdminService}=require('../services/index')
const adminService= new AdminService()
const getAllEmployees = async(req, res) => {
    try {
        const response=await adminService.getEmployeee()
        console.log(response)
        if(response.length==0){
            res.status(StatusCodes.OK).json({
                success:true,
                message:'No Employee Found',
                data:response
            })
        }else{res.status(StatusCodes.OK).json({
            success:true,
            message:'Accepted succesfully',
            data:response
        })}
    } catch (error) {
        if(error.name == 'ServiceError'){
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explaination,
                data: {}
            });
        }else {
            console.error('Error in controller:', error.name);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
    }
}

const getUserTypeEmployees=async(req,res)=>{
    try {
        const response=await adminService.getUserEmployeee()
        console.log(response)
        if(response.length==0){
            res.status(StatusCodes.OK).json({
                success:true,
                message:'No UserType Employee Found',
                data:response
            })
        }else{res.status(StatusCodes.OK).json({
            success:true,
            message:'Accepted succesfully',
            data:response
        })}
    } catch (error) {
        if(error.name == 'ServiceError'){
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explaination,
                data: {}
            });
        }else {
            console.error('Error in controller:', error.name);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
    }
}
const getActiveEmployee=async(req,res)=>{
    try {
        const response=await adminService.getActiveEmployees()
        // console.log(response)
        if(response.length==0){
            res.status(StatusCodes.OK).json({
                success:true,
                message:'No Inactive Employee Found',
                data:response
            })
        }else{res.status(StatusCodes.OK).json({
            success:true,
            message:'Accepted succesfully',
            data:response
        })}
    } catch (error) {
        if(error.name == 'ServiceError'){
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explaination,
                data: {}
            });
        }else {
            console.error('Error in controller:', error.name);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
    }
}
const getInactiveEmployees=async(req,res)=>{
    try {
        const response=await adminService.getInactiveEmployees()
        console.log(response)
        if(response.length==0){
            res.status(StatusCodes.OK).json({
                success:true,
                message:'No Inactive Employee Found',
                data:response
            })
        }else{res.status(StatusCodes.OK).json({
            success:true,
            message:'Accepted succesfully',
            data:response
        })}
    } catch (error) {
        if(error.name == 'ServiceError'){
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explaination,
                data: {}
            });
        }else {
            console.error('Error in controller:', error.name);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
    }
}


const activateEmployeeActiveStatus = async (req, res) => {
    try {
        const { userId } = req.body;
        console.log('req.body',req.body)
        const response = await adminService.activateEmployeeActiveStatus(userId);
         
        res.json({
            success: true,
            message: 'status changed to Active employee successfully',
            data: response
        });
    } catch (error) {
        if(error.name == 'ServiceError'){
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explaination,
                data: {}
            });
        }else {
            console.error('Error in controller:', error.name);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
    }
};


const deactivateEmployeeActiveStatus = async (req, res) => {
    try {
        const { userId } = req.body;
        console.log('req.body',req.body)
        const response = await adminService.deactivateEmployeeActiveStatus(userId)
        res.json({
            success: true,
            message: 'status changed to InActive Employee successfully',
            data: response
        });
    } catch (error) {
        if(error.name == 'ServiceError'){
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explaination,
                data: {}
            });
        }else {
            console.error('Error in controller:', error.name);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
    }
};

const activateEmployee = async (req, res) => {
    try {
        const { email } = req.body;
        const response = await adminService.addAsEmployee(email);
        console.log('response:', response);
        if (response === 'AlreadyEmployee') {
            return res.json({
                success: false,
                message: 'Email is already an employee'
            });
        }
         
        res.json({
            success: true,
            message: 'User status changed to employee successfully',
            data: response
        });
    } catch (error) {
        if(error.name == 'ServiceError'){
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explaination,
                data: {}
            });
        }else {
            console.error('Error in controller:', error.name);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
    }
};
const acceptEmployee = async (req, res) => {
    try {
        const { email } = req.body;
        const response = await adminService.addAsEmployee(email);
        console.log('response:', response);
        if (response === 'AlreadyEmployee') {
            return res.json({
                success: false,
                message: 'Email is already an employee'
            });
        }
         
        res.json({
            success: true,
            message: 'User status changed to employee successfully',
            data: response
        });
    } catch (error) {
        if(error.name == 'ServiceError'){
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explaination,
                data: {}
            });
        }else {
            console.error('Error in controller:', error.name);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
    }
};
const declineEmployee = async (req, res) => {
    try {
        const { email } = req.body;
        const response = await adminService.declineEmployee(email);
        
        res.json({
            success: true,
            message: 'User declined for admin & User profile deleted successfully',
            data: response
        });
    } catch (error) {
        if(error.name == 'ServiceError'){
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explaination,
                data: {}
            });
        }else {
            console.error('Error in controller:', error.name);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
    }
};

const getAllReview = async (req, res) => {
    try {
        const response = await adminService.getReviews();
        console.log(response)
        res.json({
            success: true,
            message: 'review fetched successfully',
            data: response
        });
    } catch (error) {
        if(error.name == 'ServiceError'){
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explaination,
                data: {}
            });
        }else {
            console.error('Error in controller:', error.name);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
    }
};
const addReview = async (req, res) => {
    try {
        let data = req.body;
        // console.log('request body',req.body)
        // console.log('req file',req.files);
        if (!req.files || !req.files.Picture) {
            res.json({
                message:'picture is not present'
            })
        }
        data.reviewPicture = req.files.Picture;
        const response = await adminService.addReview(data);
        res.json({
            success: true,
            message: 'Review added successfully',
            data: response
        });
    } catch (error) {

        if (error.name === 'ServiceError') {
            return res.status(error.statusCode).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
        else  {
            return res.status(error.statusCode).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
    }
};

const deleteReview = async (req, res) => {
    try {
        const {reviewId} = req.body;
        console.log('reviewId',reviewId)
        const response = await adminService.deleteReview(reviewId);
        console.log('after response in controller')
        res.json({
            success: true,
            message: 'review deleted successfully',
            data: response
        });
    } catch (error) {
        if(error.name == 'ServiceError'){
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explaination,
                data: {}
            });
        }else {
            console.error('Error in controller:', error.name);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
    }
}
const updateReview = async (req, res) => {
    try {
        const data=req.body
        // if (req.files && req.files.Picture) {
        //     data.reviewPicture = req.files.Picture;
        // }
        const response = await adminService.updateReview({...data});
        res.json({
            success: true,
            message: 'review updated successfully',
            data: response
        });
    } catch (error) {
        if(error.name == 'ServiceError'){
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explaination,
                data: {}
            });
        }else {
            console.error('Error in controller:', error.name);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
    }
    
};


const getAllNews = async (req, res) => {
    try {
        const response = await adminService.getNews();
        res.json({
            success: true,
            message: 'news fetched successfully',
            data: response
        });
    } catch (error) {
        if(error.name == 'ServiceError'){
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explaination,
                data: {}
            });
        }else {
            console.error('Error in controller:', error.name);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
    }
};

const createNews=async(req,res)=>{
    try {
        let data = {};
        let reqData=req.body
        console.log('request body:',req.body)
         
        if (!req.files || !req.files.editorImage || !req.files.newsImage) {
            res.json({
                message:'picture is not present'
            })
        }

        if (req.files && req.files.editorImage &&req.files.newsImage) {
            data.newsImage = req.files.newsImage;
            data.editorImage = req.files.editorImage;
        }

        if (data.length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'No data provided',
                success: false,
                explanation: 'Please provide either structured data in req.body or a file in req.files',
            });
        }

        const response = await adminService.createNews({...data,...reqData});
        
        res.json({
            success: true,
            message: 'Review added successfully',
            data: response
        });
    } catch (error) {
        if (error.name === 'ServiceError') {
            return res.status(error.statusCode).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
        else if (error.name === 'CreateNewsError') {
            return res.status(error.statusCode).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }else{
            console.error('Error in controller:', error.name);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
    }
}

const deleteNews = async (req, res) => {
    try {
        const {newsId} = req.body;
        console.log('newsId',newsId)
        const response = await adminService.deleteNews(newsId);
        console.log('after response in controller:',response)
        if(!response){
            res.json({
                message:"no news was deleted",
                success:false
            })
        }
        res.json({
            success: true,
            message: 'review deleted successfully',
            data: response
        });
    } catch (error) {
        if (error.name === 'DeletNewsError') {
            return res.status(error.statusCode).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }else{
            console.error('Error in controller:', error.name);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
    }
}

module.exports={
    getAllEmployees,
    getUserTypeEmployees,
    getInactiveEmployees,
    activateEmployeeActiveStatus,
    deactivateEmployeeActiveStatus,
    activateEmployee,
    acceptEmployee,
    declineEmployee,
    getAllReview,
    addReview,
    deleteReview,
    updateReview,
    getAllNews,
    createNews,
    deleteNews,
    getActiveEmployee
}