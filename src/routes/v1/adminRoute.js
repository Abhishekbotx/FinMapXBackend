const express = require('express');
const{isAuthenticatedMid,isAdmin, isAuthenticatedMidAdmin}=require('./../../middlewares/authAdmin')
const {signin,forgetPassword,verifyOtp,createSubAdmin,getAllSubAdmin,UpdateDisplayPicture, deleteSubAdmin, signout, getProfile, UpdateProfile, updatePassword}=require('../../controllers/adminAuthController')
const{acceptEmployee,getAllEmployees,getAllReview, declineEmployee,
     addReview, deleteReview,updateReview, createNews, deleteNews,
      deactivateEmployeeActiveStatus, activateEmployeeActiveStatus,
      getUserTypeEmployees,getInactiveEmployees,
      getAllNews,activateEmployee,getActiveEmployee,
      getNewsById,
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
    '/Admin/addSubAdmin',isAuthenticatedMidAdmin,isAdmin,ValidateMiddleware(SubAdminValidation),createSubAdmin
    
); 
router.get(
    '/Admin/getAllSubAdmin',isAuthenticatedMidAdmin,isAdmin,getAllSubAdmin
    
); 

router.post(
    '/Admin/deleteSubAdmin',isAuthenticatedMidAdmin,isAdmin, deleteSubAdmin
      
);
router.put(
    '/Admin/updateDisplayPicture',isAuthenticatedMidAdmin,UpdateDisplayPicture
    
);
router.put(
    '/Admin/updateProfile',isAuthenticatedMidAdmin,UpdateProfile
    
);

router.post(
    '/Admin/activateEmployeeStatus',isAuthenticatedMidAdmin,isAdmin, activateEmployeeActiveStatus
    
);
router.post(
    '/Admin/deactivateEmployeeStatus',isAuthenticatedMidAdmin,isAdmin, deactivateEmployeeActiveStatus
    
);
router.post(
    '/Admin/activateEmployee',isAuthenticatedMidAdmin,isAdmin,activateEmployee
    
);
router.post(
    '/Admin/acceptEmployee',isAuthenticatedMidAdmin,isAdmin, acceptEmployee
    
);
router.post(
    '/Admin/declineEmployee',isAuthenticatedMidAdmin,isAdmin, declineEmployee
    
);
router.get(
    '/Admin/getEmployees',isAuthenticatedMidAdmin,isAdmin,getAllEmployees
)
router.post( 
    '/getAdmin',isAuthenticatedMidAdmin,getProfile
)
router.get(
    '/Admin/getUserEmployee',isAuthenticatedMidAdmin,isAdmin,getUserTypeEmployees
)
router.get(
    '/Admin/getInactiveEmployee',isAuthenticatedMidAdmin,isAdmin,getInactiveEmployees
)
router.get(
    '/Admin/getActiveEmployee',isAuthenticatedMidAdmin,isAdmin,getActiveEmployee
)

router.get(
    '/Admin/getAllReview',isAuthenticatedMidAdmin, getAllReview
     
);
router.get(
    '/getAllReview', getAllReview
          
);
router.post(
    '/Admin/addReview',isAuthenticatedMidAdmin,ValidateMiddleware(ReviewValidation), addReview
     
);     
router.post(
    '/Admin/deleteReview',isAuthenticatedMidAdmin, deleteReview
    
);
router.put( 
    '/Admin/updateReview',isAuthenticatedMidAdmin,ValidateMiddleware(UpdateReviewValidation), updateReview
    
);

router.get(
    '/getAllNews', getAllNews
    
);
router.get(
    '/getNews/:newsId', getNewsById
    
);
router.post(
    '/Admin/addNews',isAuthenticatedMidAdmin,ValidateMiddleware(NewsValidation), createNews
    
);
router.post(
    '/Admin/deleteNews',isAuthenticatedMidAdmin, deleteNews
     
);
router.post(
    '/Admin/updatePassword',isAuthenticatedMidAdmin, updatePassword
      
);

module.exports = router;