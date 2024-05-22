const { Admin } = require('../models')
const { AdminAuthService } = require('../services/index')
const { StatusCodes } = require('http-status-codes')

const adminAuthService = new AdminAuthService()

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await adminAuthService.signIn({ email, password });
        console.log('response in controller:', response);
        
        const options = {
            expires: new Date(Date.now() + 500001000),
            httpOnly: true,
            sameSite: 'none',      
            secure: true
        };

        // Set the JWT token as the value of the cookie
        res.cookie('token', response.toString(), options).status(200).json({
            success: true,
            message: 'Admin login successful',
            // You can include other data if needed
        });
    } catch (error) {
        if (error.name === 'ServiceError') {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explanation,
                data: {}
            });
        } else {
            console.error('Error in controller:', error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
    }
}


const signout = async (req, res) => {
    try {
        console.log('Request cookies:',req.cookies.token)
        // console.log('Request token :',req.token)
        // const adminId = req.cookies.token.id       
        console.log('logging before authadminservice');
        const adminDetails = await adminAuthService.signOut(req.cookies.token)
        const options = {
            httpOnly: true,
            secure: true,
        };

        res.cookie('token', 'none', {
            expires: new Date(Date.now() + 5 * 1000),
            httpOnly: true,
        })
            // .clearCookie("refreshToken", options)
            .json( "User logged Out");
    } catch (error) {
        if (error.name === 'ServiceError') {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explanation,
                data: {}
            });
        } else {
            console.error('Error in controller:', error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
    }
}



const getProfile= async (req, res) => {
    try {
        const token = req.cookies.token;
        console.log('token in getprofile controller.js',token);
        console.log('req.body',req.body)
        const response = await adminAuthService.getAdminByToken(token);

         console.log(response)
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



const getAllSubAdmin = async (req, res) => {
    try {
        
        const response = await adminAuthService.getAllSubAdmin();
        return res.status(StatusCodes.CREATED).json({
            message: 'subAdmin created successfully',
            success: true,
            data: response
        });
    } catch (error) {

        if (error.name == 'ServiceError') {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explaination,
                data: {}
            });
        }
        else {
            console.error('Error in controller:', error);
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
    }
}
const createSubAdmin = async (req, res) => {
    try {
        const {
            fullName,
            email,
            password,
            confirmPassword,
            contactNumber =''
        } = req.body
        console.log(req.body)
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message:
                    "Password and Confirm Password do not match. Please try again.",
            })
        }
        console.log('before response send in controller');
        const response = await adminAuthService.createSubAdmin({
            fullName: fullName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            contactNumber:contactNumber

        });
        console.log('subAdmin in controller:', response)
        return res.status(StatusCodes.CREATED).json({
            message: 'subAdmin created successfully',
            success: true,
            data: response
        });
    } catch (error) {

        if (error.name == 'ServiceError') {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explaination,
                data: {}
            });
        }
        else {
            console.error('Error in controller:', error);
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
    }
}
const deleteSubAdmin = async (req, res) => {
    try {
        const { userId } = req.body
        //   console.log('Req Body:',req.body)
        //   console.log('USERID:',userId)
        const response = await adminAuthService.deleteSubAdmin(userId);
        console.log('subAdmin in controller:',)
        return res.status(StatusCodes.CREATED).json({
            message: 'subAdmin deleted successfully',
            success: true,
            // data: response
        });
    } catch (error) {

        if (error.name == 'ServiceError') {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explaination,
                data: {}
            });
        }
        else {
            console.error('Error in controller:', error);
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
    }
}



const UpdateDisplayPicture = async (req, res) => {
    try {
        const token=req.cookies.token
        const userId = req.cookies.id;
        console.log('userId in updatedisplyer controller:', userId)
        // console.log('Req Files',req.files)

        if (!req.files || !req.files.Picture) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'No displayPicture provided',
                success: false,
                explanation: 'Please provide a displayPicture'

            });
        }

        const DisplayPicture = req.files.Picture
        console.log('displaypicture:', DisplayPicture)
        const response = await adminAuthService.displayPictureUpdate(userId, DisplayPicture);
        console.log(response)
        res.status(StatusCodes.OK).json({
            message: 'Profile updated successfully',
            success: true,
            data: response
        });
    } catch (error) {
        console.error('Error in profile controller:', error.message);

        if (error.name == 'ServiceError') {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explaination,
                data: {}
            });
        }
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            name: error.name,
            message: error.message || 'Internal Server Error',
            success: false,
            explanation: error.explanation || 'Unknown error occurred',
            data: {}
        });
    }
}
const UpdateProfile = async (req, res) => {

    try {
        const token=req.cookies.token

        if (!req.files || !req.files.Picture) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'No displayPicture provided',
                success: false,
                explanation: 'Please provide a displayPicture'

            });
        }

        // const DisplayPicture = req.files.Picture
        // console.log('displaypicture:', DisplayPicture)
        // console.log('Req Files',req.files)
        const data=req.body
        const image = req.files.Picture
        console.log('displaypicture:', image)
        const response = await adminAuthService.updateProfile({...data,image,token});
        console.log(response)
        res.status(StatusCodes.OK).json({
            message: 'Profile updated successfully',
            success: true,
            data: response
        });
    } catch (error) {
        console.error('Error in profile controller:', error.message);

        if (error.name == 'ServiceError') {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explaination,
                data: {}
            });
        }
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            name: error.name,
            message: error.message || 'Internal Server Error',
            success: false,
            explanation: error.explanation || 'Unknown error occurred',
            data: {}
        });
    }
}



module.exports = { getAllSubAdmin,createSubAdmin, deleteSubAdmin, signin,signout,getProfile,UpdateProfile, UpdateDisplayPicture }
