const bcrypt = require('bcrypt');
const crypto = require('crypto');
const{EmployeeRepository}=require('../repository/index')
const mailSend=require('../utils/nodemailer')
const {ServiceError}=require('../utils/errors/index');
const mailsender = require('../utils/nodemailer');
const {passwordUpdated}=require('../mail/passwordUpdate')
const employeeRepository=new EmployeeRepository()
class resetPasswordService{
    async resetPasswordToken({email}) {
        try {
            const userDetails = await employeeRepository.getUserByEmail(email);
            console.log("userdetails:",userDetails)
            if (!userDetails) {
                throw new ServiceError(
                    'User Not Found',
                    `The email ${email} is not registered with us. Please enter a valid email.`,
                    404
                );
            }
            

            const token = crypto.randomBytes(20).toString("hex");
            console.log(token)
            userDetails.token = token;
            await userDetails.save();
            console.log(userDetails)

            const url = `http://localhost:3000/update-password/${token}`;
            console.log(url)
            const message = mailSend(
                email,
                "Password Reset",
                `Your password reset link is ${url}. Please click this link to reset your password.`
            );
            // console.log(message)
            return { success: true, message: "Email sent successfully. Please check your email to continue.",messageResponse:message.response };
        } catch (error) {
            console.error("Error in sending reset password token:", error);
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

            const userDetails = await employeeRepository.getUserByToken(token)
            if (!userDetails) {
                throw new ServiceError(
                    'Invalid Token',
                    'The reset password token is invalid or has expired.',
                    400
                );
            }

            console.log(userDetails)

            const encryptedPassword = await bcrypt.hash(password, 10);
            userDetails.password = encryptedPassword;
            userDetails.token = undefined;
            userDetails.resetPasswordExpires = undefined;
            await userDetails.save();
            console.log(userDetails)
            return { success: true, message: "Password reset successful." };
        } catch (error) {
            throw error
        }
    }
    async updatePassword(data) {
        try {
            const { oldPassword,newPassword,confirmNewPassword,userId } = data;
            const userDetails=await employeeRepository.getUserById(userId)
            console.log(userDetails)
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
            userDetails.password = encryptedPassword;
            userDetails.token = undefined;
            userDetails.resetPasswordExpires = undefined;
            const{email,firstName,lastName}=userDetails
            const fullName=`${firstName} ${lastName}`
            console.log(email,firstName)
            await userDetails.save();
            console.log(userDetails)
            mailsender(email,
                'Password Updated Successfully',
                passwordUpdated(email,fullName))
            return { success: true, message: "Password updated successfully." };

        } catch (error) {
            throw error
        }
    }
}

module.exports=resetPasswordService