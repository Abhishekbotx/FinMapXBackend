const { verifyToken } = require("../utils/fileAndtoken");
const { EmployeeRepository } = require('../repository/index')
const employeeRepository = new EmployeeRepository()
const { JWT_KEY } = require('./../config/dotenvConfig')

const isAuthenticatedMid = async (req, res, next) => {
    try {

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ success: false, message: `Token Missing` });
        }

        try {
            const decodedToken = verifyToken(token, JWT_KEY);
            if (!decodedToken) { 
                throw new ServiceError(
                    'Invalid Token',
                    'The provided token is invalid.',
                    StatusCodes.BAD_REQUEST
                );
            }
            req.employee = { ...decodedToken };
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

    try {
        const employeeRole = req.employee.role;

        if (employeeRole === 'Employee') {
            console.log('User is an employe');
        } else {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: 'Unauthorized',
                success: false,
                error: 'Only Employees are allowed to access this resource',
                data: {}
            });
        }
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


module.exports = { isAuthenticatedMid, isEmployee }