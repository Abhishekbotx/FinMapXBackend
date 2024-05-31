const express = require('express');
const{isAuthenticatedMid,isAdmin}=require('./../../middlewares/authAdmin')
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
    '/Admin/addSubAdmin',isAuthenticatedMid,isAdmin,ValidateMiddleware(SubAdminValidation),createSubAdmin
    
); 
router.get(
    '/Admin/getAllSubAdmin',isAuthenticatedMid,isAdmin,getAllSubAdmin
    
); 

router.post(
    '/Admin/deleteSubAdmin',isAuthenticatedMid,isAdmin, deleteSubAdmin
      
);
router.put(
    '/Admin/updateDisplayPicture',isAuthenticatedMid,UpdateDisplayPicture
    
);
router.put(
    '/Admin/updateProfile',isAuthenticatedMid,UpdateProfile
    
);

router.post(
    '/Admin/activateEmployeeStatus',isAuthenticatedMid,isAdmin, activateEmployeeActiveStatus
    
);
router.post(
    '/Admin/deactivateEmployeeStatus',isAuthenticatedMid,isAdmin, deactivateEmployeeActiveStatus
    
);
router.post(
    '/Admin/activateEmployee',isAuthenticatedMid,isAdmin,activateEmployee
    
);
router.post(
    '/Admin/acceptEmployee',isAuthenticatedMid,isAdmin, acceptEmployee
    
);
router.post(
    '/Admin/declineEmployee',isAuthenticatedMid,isAdmin, declineEmployee
    
);
router.get(
    '/Admin/getEmployees',isAuthenticatedMid,isAdmin,getAllEmployees
)
router.post(
    '/getAdmin',isAuthenticatedMid,getProfile
)
router.get(
    '/Admin/getUserEmployee',isAuthenticatedMid,isAdmin,getUserTypeEmployees
)
router.get(
    '/Admin/getInactiveEmployee',isAuthenticatedMid,isAdmin,getInactiveEmployees
)
router.get(
    '/Admin/getActiveEmployee',isAuthenticatedMid,isAdmin,getActiveEmployee
)

router.get(
    '/Admin/getAllReview',isAuthenticatedMid, getAllReview
     
);
router.get(
    '/getAllReview', getAllReview
          
);
router.post(
    '/Admin/addReview',isAuthenticatedMid,ValidateMiddleware(ReviewValidation), addReview
     
);     
router.post(
    '/Admin/deleteReview',isAuthenticatedMid, deleteReview
    
);
router.put( 
    '/Admin/updateReview',isAuthenticatedMid,ValidateMiddleware(UpdateReviewValidation), updateReview
    
);

router.get(
    '/getAllNews', getAllNews
    
);
router.get(
    '/getNews/:newsId', getNewsById
    
);
router.post(
    '/Admin/addNews',isAuthenticatedMid,ValidateMiddleware(NewsValidation), createNews
    
);
router.post(
    '/Admin/deleteNews',isAuthenticatedMid, deleteNews
     
);
router.post(
    '/Admin/updatePassword',isAuthenticatedMid, updatePassword
     
);

module.exports = router;