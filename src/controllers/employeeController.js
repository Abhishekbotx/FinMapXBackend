const { StatusCodes } = require('http-status-codes');
const { EmployeeService } = require('../services/index.js');
const { AppError } = require('../utils/errors/index.js');

const employeeService = new EmployeeService();

const signup = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
          } = req.body

          if(password!==confirmPassword){
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message:
                  "Password and Confirm Password do not match. Please try again.",
              })
          }
        //   console.log('before response send in controller');
        const response = await employeeService.createUser({
              firstName:firstName,  
              lastName:lastName,  
              email: email,
              password: password,
              otp:otp
        });
        return res.status(StatusCodes.CREATED).json({
            message: 'User created successfully',
            success: true,
            data: response
        });
    } catch (error) {
        
         if(error.name == 'ServiceError'){
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explanation,
                data: {}
            });
        }
        else {
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

const signin = async (req, res) => {
    try {
        const{email,password}=req.body
        const response = await employeeService.signIn({
            email: email,
            password: password
        });
        // console.log(res)

        const options = {
            expires: new Date(Date.now() +  24 * 60 * 60 * 1000),
            httpOnly: true,
          }
          return res.cookie("token", response, options).status(200).json({
            success: true,
            token:response,
            message: `admin Login Success`,
          }) 
    } catch (error) {
        console.log("Something went wrong in the controller");
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



const cutomerCheckIn = async (req, res) => {
    try {
        const data= req.body
        // const adderId=req.userId
        const adderId=req.employee.id
        console.log('adderId hai:',req.body.adderId)
        const response = await employeeService.cutomerCheckInService({
            ...data,adderId
        });
        // console.log({ adder: req.body.adderId, userId: req.body.id });
        return res.status(StatusCodes.OK).json({
            message: 'customer checkedIn successfully',
            success: true,
            data: response
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explanation,
                data: {}
            });
        } else {
            console.error('Error in controller:', error);
            const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
            return res.status(statusCode).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
    }
}


const generateOtp=async(req,res)=>{
    try {
        // console.log(req.body);
        
        const{email}=req.body;
        if(!email){
            throw new AppError(
                'AppError',
                'Email not found',
                'Unable to fetch email',
                StatusCodes.NOT_ACCEPTABLE
            )
        }
        const otp=await employeeService.createOtp(email)
        console.log('otpresponse:',otp)
        return res.json({
            data:otp,
            message:"otp created successfully"
        })
    } catch (error) {
        if(error.name==='AppError'){
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explanation,
                data: {}
            });
        }
        console.log("Something went wrong in the controller");
        throw error
    }
}






module.exports = { signup, signin,cutomerCheckIn, generateOtp}