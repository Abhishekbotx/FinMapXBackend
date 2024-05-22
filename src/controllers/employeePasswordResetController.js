const { ResetPasswordService } = require('../services/index')
const resetPasswordService = new ResetPasswordService()
const resetPassword = async (req, res) => {
    try {
        const password = await resetPasswordService.resetPassword({
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            token: req.params.token
        })

        return res.json({
            success:true,
            message: "password reset successful" 
        })
    } catch (error) {
        // if(error.name)
        console.log("Something went wrong in the controller");
        if (error.name === 'ServiceError') {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explanation,
                data: {}
            });
        }
        throw error
    }
}
const forgetPassword = async (req, res) => {
    try {
        const resetToken = await resetPasswordService.resetPasswordToken({ email: req.body.email })
        console.log(resetToken);

        return res.json({
            data: resetToken,
            message: "token generated created successfully"
        })
    } catch (error) {
        console.log("Something went wrong in the controller");
        console.log('error name in controller', error.name)
        if (error.name === 'ServiceError') {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explanation,
                data: {}
            });
        }
    }
}
const updatePassword = async (req, res) => {
    try {
        const userId=req.token.id
        console.log(userId)
        const {oldPassword,newPassword,confirmNewPassword}=req.body
        const resetToken = await resetPasswordService.updatePassword({ oldPassword,newPassword,confirmNewPassword,userId})
        console.log(resetToken);

        return res.json({
            success: resetToken.success,
            message: "password  updated successfully"
        })
    } catch (error) {
        console.log("Something went wrong in the controller:",error);
        console.log('error name in controller', error.name)
        if (error.name === 'ServiceError') {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explanation,
                data: {}
            });
        }
    }
}

module.exports = { forgetPassword, resetPassword,updatePassword }