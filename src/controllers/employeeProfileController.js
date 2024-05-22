const { StatusCodes } = require('http-status-codes');
const { ProfileService } = require('../services/index');
const profileService = new ProfileService();

const updateProfile = async (req, res) => {
    try {
        const userId = req.token.id;
        const data = req.body;
        console.log('userId:',userId,'data:',data)
        const response=await profileService.profileUpdate(userId, data);
        res.status(StatusCodes.OK).json({ 
            message: 'Profile updated successfully',
            success:true,
            data:response 
        });
    } catch (error) {
        if(error.name == 'ClientError'){
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explaination,
                data: {}
            });
        }
        console.error('Error in profile controller:');
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
             error: 'Internal server error' });
    }
};


const updateDisplayPicture = async (req, res) => {
    try {
        const userId = req.token.id;
        // console.log('Req Files',req.files)

        if (!req.files || !req.files.Picture) {
            return res.status(StatusCodes.BAD_REQUEST).json({ 
            message:  'No displayPicture provided',
            success: false,
            explanation:'Please provide a displayPicture'
    
            }); 
        }

        const DisplayPicture = req.files.Picture
        // console.log('userId:',userId,'data:',data)
        const response=await profileService.displayPictureUpdate(userId, DisplayPicture);
        console.log(response)
        res.status(StatusCodes.OK).json({ 
            message: 'Profile updated successfully',
            success:true, 
            data:response 
        });
    } catch (error) {
        console.error('Error in profile controller:', error.message);

        if(error.name == 'ServiceError'){
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error.explaination,
                data: {}
            });
        }
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            name:error.name,
            message: error.message || 'Internal Server Error',
            success: false,
            explanation: error.explanation || 'Unknown error occurred',
            data: {}
            });
    }
};


module.exports = { updateProfile, updateDisplayPicture };