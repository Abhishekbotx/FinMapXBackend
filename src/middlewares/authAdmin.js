const { verifyToken } = require("../utils/fileAndtoken");
const{ServiceError}=require('./../utils/errors/index')
const {StatusCodes}=require('http-status-codes')
const{AdminAuthRepository}=require('../repository/index')   
const adminAuthRepository=new AdminAuthRepository()
const {ADMIN_JWT_KEY}=require('./../config/dotenvConfig') 

const isAuthenticatedMidAdmin = async (req, res,next) => { 
    try {
        // console.log('req.cookies:',req.cookies)
        const token = req.cookies.adminToken;
        console.log('token in isAuthadmin:',token);
        if (!token) {
            return res.status(401).json({ success: false, message: `Token Missing` });
        }

        try {
            const decodedToken = verifyToken(token, ADMIN_JWT_KEY);
            if (!decodedToken) { 
                throw new ServiceError(
                    'Invalid Token',
                    'The provided token is invalid.',
                    StatusCodes.BAD_REQUEST
                );
            }
            req.admin = {...decodedToken};
        } catch (error) {
            return res
                .status(401)
                .json({ success: false, message: "token is invalid" });
        }

        next();
 
    } catch (error) {
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: error.message,
                success: false,
                error: "jwt is not valid or provided",
                data: {}
            });
        } else if (error.name === 'ServiceError') {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: error.message,
                success: false,
                error: error.explanation,
                data: {}
            });
        } else {
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

const isAdmin = async(req, res, next) => {

   try {
    const accountType=req.admin.role

    if (accountType === 'Admin') {
        console.log('User is an Admin')
    }else{
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: 'Unauthorized',
            success: false,
            error: 'Only admins are allowed to access this resource',
            data: {} 
        });
    }
    next()
   } catch (error) {
        
    if (error.name === 'ServiceError') {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: error.message,
            success: false,
            error: error.explanation,
            data: {}
        });
    } else {
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

module.exports={isAuthenticatedMidAdmin,isAdmin}