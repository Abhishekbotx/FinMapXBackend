const express = require('express');
const{isAuthenticatedMid}=require('./../../middlewares/authEmployee')
const {signin,signup,generateOtp,cutomerCheckIn, userExists, documentsVerified, loanApproval, loanSanctioned,getAllCustomers,getCustomersByEmployeeId, getCustomerByItsId} = require('../../controllers/employeeController');
const {forgetPasswordEmployee,resetPassword,updatePassword} = require('../../controllers/employeePasswordResetController');
const { updateProfile,updateDisplayPicture ,getEmployeeProfile} = require('../../controllers/employeeProfileController');
const upload = require('../../utils/fileuploadTest');
const {EmployeeSignupValidation,CustomerValidation, CustomerCheckInValidation, CheckInValidation}=require('./../../validators/index')
const {ValidateMiddleware}=require('./../..//middlewares/index');
const { customerCheckIn } = require('../../controllers/customerSideCheckInController');
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
    '/updateProfile',isAuthenticatedMid, updateProfile
    
);
router.put(
    '/updateDisplayPicture',isAuthenticatedMid, updateDisplayPicture
    
);

router.post(
    '/checkCustomerExists',isAuthenticatedMid, userExists
    
);      
router.post(
    '/documentsVerify',documentsVerified 
    
); 
router.post(
    '/loanApproval',loanApproval
    
);
router.post(
    '/loanSanctioned',loanSanctioned 
    
);
router.get(
    '/getAllCustomers',isAuthenticatedMid, getAllCustomers
    
);
router.post(
    '/getCustomerByEmployeeId',isAuthenticatedMid, getCustomersByEmployeeId
    
);
router.post( 
    '/updatePassword',isAuthenticatedMid,updatePassword
    
);  
 
router.post(
    '/getEmployee',isAuthenticatedMid,getEmployeeProfile
)
router.post( 
    '/getCustomerProfile',isAuthenticatedMid,getCustomerByItsId 
       
);
  
router.post(
    '/upload',upload
    
);
router.post(
    '/checkIn',ValidateMiddleware(CheckInValidation),customerCheckIn
    
);


module.exports = router;