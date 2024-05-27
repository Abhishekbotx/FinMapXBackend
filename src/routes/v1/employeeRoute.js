const express = require('express');
const{isAuthenticatedMid}=require('./../../middlewares/authEmployee')
const {signin,signup,generateOtp,cutomerCheckIn, userExists} = require('../../controllers/employeeController');
const {forgetPasswordEmployee,resetPassword,updatePassword} = require('../../controllers/employeePasswordResetController');
const { updateProfile,updateDisplayPicture } = require('../../controllers/employeeProfileController');
const upload = require('../../utils/fileuploadTest');
const {EmployeeSignupValidation,CustomerValidation}=require('./../../validators/index')
const {ValidateMiddleware}=require('./../..//middlewares/index')
const router = express.Router();



router.post(
    '/signup',
    ValidateMiddleware(EmployeeSignupValidation),
    signup
);
router.post(
    '/signin',
    signin
);
router.post(
    '/customerCheckIn',
    ValidateMiddleware(CustomerValidation),
    isAuthenticatedMid,
    cutomerCheckIn
);

router.post(
    '/generateOtp', 
    
    generateOtp
);
router.post(
    '/resetPassword/:token', 
    resetPassword
);
router.post(
    '/forgetPassword', forgetPasswordEmployee
    
);
router.put(
    '/updatePassword',isAuthenticatedMid, updatePassword
    
);
router.put(
    '/updateProfile',isAuthenticatedMid, updateProfile
    
);
router.put(
    '/updateDisplayPicture',isAuthenticatedMid, updateDisplayPicture
          
);
router.post(
    '/checkCustomerExists',isAuthenticatedMid, userExists
    
);
router.post(
    '/upload',upload
    
);


module.exports = router;