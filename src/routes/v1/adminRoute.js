const express = require('express');
const{isAuthenticatedMid,isAdmin}=require('./../../middlewares/authAdmin')
const {signin,forgetPassword,verifyOtp,createSubAdmin,getAllSubAdmin,UpdateDisplayPicture, deleteSubAdmin, signout, getProfile, UpdateProfile, updatePassword}=require('../../controllers/adminAuthController')
const{acceptEmployee,getAllEmployees,getAllReview, declineEmployee,
     addReview, deleteReview,updateReview, createNews, deleteNews,
      deactivateEmployeeActiveStatus, activateEmployeeActiveStatus,
      getUserTypeEmployees,getInactiveEmployees,
      getAllNews,activateEmployee,getActiveEmployee,
    }=require('../../controllers/adminController')
const{SubAdminValidation,ReviewValidation,NewsValidation, UpdateReviewValidation}=require('./../../validators/index')
const{ValidateMiddleware}=require('./../../middlewares/index');
const { resetPasswordToken, resetPassword } = require('../../controllers/adminPasswordResetController');
const router = express.Router();


router.post( 
    '/AdminSignin', signin
    
);
router.post(     
    '/AdminLogout', signout
    
);
router.post(
    '/Admin/forgetPassword', resetPasswordToken
    
);

router.post(
    '/Admin/resetPassword/:token', 
    resetPassword
);

router.post(     
    '/Admin/verifyOtp', verifyOtp
    
);
router.post(
    '/Admin/addSubAdmin',ValidateMiddleware(SubAdminValidation),createSubAdmin
    
); 
router.get(
    '/Admin/getAllSubAdmin',isAdmin,getAllSubAdmin
    
); 

router.post(
    '/Admin/deleteSubAdmin',isAdmin, deleteSubAdmin
      
);
router.put(
    '/Admin/updateDisplayPicture',UpdateDisplayPicture
    
);
router.put(
    '/Admin/updateProfile',UpdateProfile
    
);

router.post(
    '/Admin/activateEmployeeStatus', activateEmployeeActiveStatus
    
);
router.post(
    '/Admin/deactivateEmployeeStatus', deactivateEmployeeActiveStatus
    
);
router.post(
    '/Admin/activateEmployee', activateEmployee
    
);
router.post(
    '/Admin/acceptEmployee', acceptEmployee
    
);
router.post(
    '/Admin/declineEmployee', declineEmployee
    
);
router.get(
    '/Admin/getEmployees',getAllEmployees
)
router.post(
    '/getAdmin',getProfile
)
router.get(
    '/Admin/getUserEmployee',getUserTypeEmployees
)
router.get(
    '/Admin/getInactiveEmployee',getInactiveEmployees
)
router.get(
    '/Admin/getActiveEmployee',getActiveEmployee
)

router.get(
    '/Admin/getAllReview', getAllReview
     
);
router.get(
    '/getAllReview', getAllReview
          
);
router.post(
    '/Admin/addReview',ValidateMiddleware(ReviewValidation), addReview
     
);     
router.post(
    '/Admin/deleteReview', deleteReview
    
);
router.put( 
    '/Admin/updateReview',ValidateMiddleware(UpdateReviewValidation), updateReview
    
);

router.get(
    '/getAllNews', getAllNews
    
);
router.post(
    '/Admin/addNews',ValidateMiddleware(NewsValidation), createNews
    
);
router.post(
    '/Admin/deleteNews', deleteNews
     
);
router.post(
    '/Admin/updatePassword', updatePassword
     
);

module.exports = router;