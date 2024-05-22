const express = require('express');
const{isAuthenticatedMid,isAdmin}=require('./../../middlewares/authAdmin')
const {signin,createSubAdmin,getAllSubAdmin,UpdateDisplayPicture, deleteSubAdmin, signout, getProfile, UpdateProfile}=require('../../controllers/adminAuthController')
const{acceptEmployee,getAllEmployees,getAllReview, declineEmployee,
     addReview, deleteReview,updateReview, createNews, deleteNews,
      deactivateEmployeeActiveStatus, activateEmployeeActiveStatus,
      getUserTypeEmployees,getInactiveEmployees,
      getAllNews,activateEmployee,getActiveEmployee,
    }=require('../../controllers/AdminController')
const{SubAdminValidation,ReviewValidation,NewsValidation}=require('./../../validators/index')
const{ValidateMiddleware}=require('./../../middlewares/index')
const router = express.Router();


router.post( 
    '/AdminSignin', signin
    
);
router.post(     
    '/AdminLogout',isAuthenticatedMid, signout
    
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
    '/Admin/activateEmployee',isAuthenticatedMid,isAdmin, activateEmployee
    
);
router.post(
    '/Admin/acceptEmployee',isAuthenticatedMid,isAdmin, acceptEmployee
    
);
router.post(
    '/Admin/declineEmployee',isAuthenticatedMid,isAdmin, declineEmployee
    
);
router.get(
    '/admin/getEmployees',isAuthenticatedMid,isAdmin,getAllEmployees
)
router.get(
    '/getAdmin',getProfile
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
    '/Admin/updateReview',isAuthenticatedMid,ValidateMiddleware(ReviewValidation), updateReview
    
);

router.get(
    '/getAllNews', getAllNews
    
);
router.post(
    '/Admin/addNews',isAuthenticatedMid,ValidateMiddleware(NewsValidation), createNews
    
);
router.post(
    '/Admin/deleteNews',isAuthenticatedMid, deleteNews
    
);

module.exports = router;