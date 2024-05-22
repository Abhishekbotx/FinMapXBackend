const bcrypt = require('bcrypt');
const crypto = require('crypto');
const{AdminRepository}=require('../repository/index')
const mailSend=require('../utils/nodemailer')
const {ServiceError}=require('../utils/errors/index')
const adminRepository=new AdminRepository()

class resetPasswordService{
    async resetPasswordToken({email}) {
        try {
            const adminDetails = await adminRepository.getAdminByEmail(email);
            console.log("userdetails:",adminDetails)
            if (!userDetails) {
                throw new ServiceError(
                    'User Not Found',
                    `The email ${email} is not registered with us. Please enter a valid email.`,
                    404
                );
            }
            

            const token = crypto.randomBytes(20).toString("hex");
            console.log(token)
            adminDetails.token = token;
            await adminDetails.save();
            console.log(adminDetails)

            const url = `http://localhost:3000/update-password/${token}`;
            console.log(url)
            const message =await mailSend(
                email,
                "Password Reset",
                `Your password reset link is ${url}. Please click this link to reset your password.`
            );
            // console.log(message)
            return { success: true, message: "Email sent successfully. Please check your email to continue.",messageResponse:message.response };
        } catch (error) {
            console.error("Error in sending reset password token:", error);
            if(error.name=='ServiceError')
            throw new ServiceError(       
                error.message,
                error.explanation, 
                error.statusCode 
            );
            throw error
        }
    } 

    async resetPassword(data) {
        try {
            const { password, confirmPassword, token } = data;

            if (confirmPassword !== password) {
                throw new ServiceError(
                    'Password Mismatch',
                    'Password and confirm password do not match.',
                    400
                );
            }

            const adminDetails = await adminRepository.findByToken(token);
            if (!userDetails) {
                throw new ServiceError(
                    'Invalid Token',
                    'The reset password token is invalid or has expired.',
                    400
                );
            }

            console.log(userDetails)

            const encryptedPassword = await bcrypt.hash(password, 10);
            adminDetails.password = encryptedPassword;
            adminDetails.token = undefined;
            adminDetails.resetPasswordExpires = undefined;
            await adminDetails.save();
            console.log(adminDetails)
            return { success: true, message: "Password reset successful." };
        } catch (error) {
            if(error.name=='ServiceError')
            throw new ServiceError(       
                error.message,
                error.explanation, 
                error.statusCode 
            );
            throw error
        }
    }
    async updatePassword(data) {
        try {
            const { oldPassword,newPassword,confirmNewPassword,userId } = data;
            const adminDetails=await adminRepository.getAdminById(userId)
            const passwordCheck=bcrypt.compare(oldPassword,userDetails.password)

            if(!passwordCheck){
                    throw new ServiceError(
                        'Incorrect Password  ',
                        'Please check your password and try again.',
                        400
                    );
 
            }
            


            if (confirmNewPassword !== newPassword) {
                throw new ServiceError(
                    'Password Mismatch',
                    'newPassword and confirmNewPassword password do not match.',
                    400
                );
            }


            const encryptedPassword = await bcrypt.hash(confirmNewPassword, 10);
            adminDetails.password = encryptedPassword;
            adminDetails.token = undefined;
            adminDetails.resetPasswordExpires = undefined;
            await adminDetails.save();
            console.log(adminDetails)
            return { success: true, message: "Password updated successfully." };

        } catch (error) {
            if(error.name=='ServiceError')
            throw new ServiceError(       
                error.message,
                error.explanation, 
                error.statusCode 
            );
            throw error
        }
    }
}

module.exports=resetPasswordService