const { AdminResetPasswordService } = require('../services/index')
const resetPasswordService = new AdminResetPasswordService()
const resetPassword = async (req, res) => {
    try {
        const otp = await resetPasswordService.resetPassword({
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            token: req.body.token
        })
        console.log(otp)
        return res.json({
            data: otp,
            message: "otp created successfully"
        })
    } catch (error) {
        // if(error.name)
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
const resetPasswordToken = async (req, res) => {
    try {
        const resetToken = await resetPasswordService.resetPasswordToken({ email: req.body.email })
        console.log(resetToken);

        return res.json({
            data: resetToken,
            message: "token generated created successfully"
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
const updatePassword = async (req, res) => {
    try {
        const userId=req.user.id
        const {oldPassword,newPassword,confirmNewPassword}=req.body
        const resetToken = await resetPasswordService.updatePassword({ oldPassword,newPassword,confirmNewPassword,userId})
        console.log(resetToken);

        return res.json({
            data: resetToken,
            message: "token generated created successfully"
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

module.exports = { resetPasswordToken, resetPassword,updatePassword }