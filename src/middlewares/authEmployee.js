const { verifyToken } = require("../utils/fileAndtoken");
const{EmployeeRepository}=require('../repository/index')
const employeeRepository=new EmployeeRepository()
const {JWT_KEY}=require('./../config/dotenvConfig')

const isAuthenticatedMid = async (req, res,next) => {
    try {

        // console.log('Req cookies', req.cookies);
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ success: false, message: `Token Missing` });
        }

        try {
            const decodedToken = verifyToken(token, JWT_KEY);
            if (!decodedToken) { //♨️Here modification is needed 
                throw new ServiceError(
                    'Invalid Token',
                    'The provided token is invalid.',
                    StatusCodes.BAD_REQUEST
                );
            }
            req.employee = {...decodedToken,token};
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
 
const isEmployee = async (req, res, next) => {
    // console.log('is in admin')

    const employeeId = req.employee.id;
    const employeeDetails = await adminAuthRepository.getAdminById(employeeId);
    // console.log('is in  isAuth');
    const employeeToken = employeeDetails.token
    const hasEmployeeRole = employeeDetails.accountType
    if (employeeToken !== req.employee.token) {
        throw new ServiceError(
            'Token Tampered',
            ' token unautorized.',
            StatusCodes.UNAUTHORIZED
        );
    }

    if(adminDetails.active!=='active'){
        throw new ServiceError(
            'Employee Inactive',
            ' Employee is Inactive ,contact Admin .',
            StatusCodes.UNAUTHORIZED
        );
    }

    if (hasEmployeeRole === 'Employee') {
        console.log('User is an Employee')
        next();
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: 'Unauthorized',
            success: false,
            error: 'Only Employee are allowed to access this resource',
            data: {}
        });
    }
};


module.exports={isAuthenticatedMid,isEmployee}