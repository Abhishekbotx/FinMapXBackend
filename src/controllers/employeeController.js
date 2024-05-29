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

        if (password !== confirmPassword) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message:
                    "Password and Confirm Password do not match. Please try again.",
            })
        }
        //   console.log('before response send in controller');
        const response = await employeeService.createUser({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            otp: otp
        });
        return res.status(StatusCodes.CREATED).json({
            message: 'User created successfully',
            success: true,
            data: response
        });
    } catch (error) {

        if (error.name == 'ServiceError') {
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
        const { email, password } = req.body;
        const response = await employeeService.signIn({
            email: email,
            password: password
        });
        console.log('response in controller:', response);
        const options = {
            expires: new Date(Date.now() + 20 * 60 * 60 * 1000),
            httpOnly: true,
        };

        if (response.success) {
            return res.cookie("token", response.token, options).status(200).json({
                success: response.success,
                token: response.token,
                message: `Employee Login Success`,
                user: email,
                empId: response.id
            });
        } else {
            return res.status(401).json({
                success: false,
                message: response.message
            });
        }
    } catch (error) {
        console.log("Something went wrong in the controller");
        if (error.name == 'ServiceError') {
            return res.status(error.statusCode).json({
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




const cutomerCheckIn = async (req, res) => {
    try {
        const data = req.body;
        const adderId = req.employee.id;
        const response = await employeeService.cutomerCheckInService({ ...data, adderId });
        return res.status(StatusCodes.OK).json({
            message: 'customer checkedIn successfully',
            success: true,
            data: response
        });
    } catch (error) {
        if (error.name === 'ServiceError') {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explaination,
                data: {}
            });
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong',
            success: false,
            error: error.message,
            data: {}
        });
    }
};

const userExists = async (req, res) => {
    try {
        const { email } = req.body;
        const exists = await employeeService.userExists(email);
        console.log(exists);
        return res.status(StatusCodes.OK).json({
            message: 'User exists check completed',
            success: true,
            exists
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
        else {
            return res.status(error.statusCode).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
    };
}


const generateOtp = async (req, res) => {
    try {
        // console.log(req.body);

        const { email } = req.body;
        if (!email) {
            throw new AppError(
                'AppError',
                'Email not found',
                'Unable to fetch email',
                StatusCodes.NOT_ACCEPTABLE
            )
        }
        const otp = await employeeService.createOtp(email)
        console.log('otpresponse:', otp)
        return res.json({
            data: otp,
            message: "otp created successfully"
        })
    } catch (error) {
        if (error.name === 'AppError') {
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

const documentsVerified = async (req, res) => {
    try {
        // console.log(req.body);

        const { email } = req.body;

        const response = await employeeService.documentsVerify(email)

        // console.log('otpresponse:',otp)
        return res.json({
            success: response,
            message: "otp created successfully"
        })
    } catch (error) {
        if (error.name === 'AppError') {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explanation,
                data: {}
            });
        }  else if (error.name === 'ServiceError') {
            return res.status(error.statusCode).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
        else {
            return res.status(error.statusCode).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
    };

}
const loanApproval = async (req, res) => {
    try {
        // console.log(req.body);

        const { email } = req.body;

        const response = await employeeService.loanApprove(email)

        // console.log('otpresponse:',user)
        return res.json({
            success: response,
            message: "loan approval status  changed successfully"
        })
    } catch (error) {
        if (error.name === 'AppError') {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explanation,
                data: {}
            });
        }  else if (error.name === 'ServiceError') {
            return res.status(error.statusCode).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
        else {
            return res.status(error.statusCode).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
    }
}
const loanSanctioned = async (req, res) => {
    try {
        // console.log(req.body);

        const { email } = req.body;

        const response = await employeeService.loanSanctioned(email)

        // console.log('otpresponse:',user)
        return res.json({
            success: response,
            message: "loan approval status  changed successfully"
        })
    } catch (error) {
        if (error.name === 'AppError') {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explanation,
                data: {}
            });
        }  else if (error.name === 'ServiceError') {
            return res.status(error.statusCode).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
        else {
            return res.status(error.statusCode).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }

    }
}
const getAllCustomers = async (req, res) => {
    try {

        const user = await employeeService.getAllCustomers()
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                data: user,
                message: "No user Found"
            })
        }

        return res.json({
            success: true,
            data: user,
            message: "Customers fetched successfully"
        })
    } catch (error) {
        if (error.name === 'AppError') {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explanation,
                data: {}
            });
        }  else if (error.name === 'ServiceError') {
            return res.status(error.statusCode).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
        else {
            return res.status(error.statusCode).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }

    }
}
const getCustomersByEmployeeId = async (req, res) => {
    try {

        const { id } = req.body
        console.log('id check in controller', id);
        const user = await employeeService.getCustomersByEmployeeId(id)
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                data: user,
                message: "No user Found"
            })
        }

        return res.json({
            success: true,
            data: user,
            message: "Customers fetched successfully"
        })
    } catch (error) {
        if (error.name === 'AppError') {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explanation,
                data: {}
            });
        }  else if (error.name === 'ServiceError') {
            return res.status(error.statusCode).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
        else {
            return res.status(error.statusCode).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
    }
}
const getCustomerByItsId = async (req, res) => {
    try {
        const { id } = req.body
        console.log('id in customer:', req.body);
        const user = await employeeService.getCustomer(id)
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                data: user,
                message: "No user Found"
            })
        }

        return res.json({
            success: true,
            data: user,
            message: "customer fetched successfully"
        })
    } catch (error) {
        if (error.name === 'AppError') {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explanation,
                data: {}
            });
        }  else if (error.name === 'ServiceError') {
            return res.status(error.statusCode).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }
        else {
            return res.status(error.statusCode).json({
                message: error.message || 'Internal Server Error',
                success: false,
                error: error.explanation || 'Unknown error occurred',
                data: {}
            });
        }

    }
}






module.exports = { signup, signin, cutomerCheckIn, generateOtp, userExists, getCustomersByEmployeeId, getAllCustomers, getCustomerByItsId, documentsVerified, loanSanctioned, loanApproval }