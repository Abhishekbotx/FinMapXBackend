const fs = require('fs');
const path = require('path');
const ServiceError = require('./errors/service-error');
const {StatusCodes}=require('http-status-codes')

const uploadFile = async (file, folder) => {
    try {
        console.log('entered file upload');
        if (!file) {
            throw new ServiceError(
                'no file Error',
                'there is no file to upload ',
                StatusCodes.BAD_REQUEST
            ) 
        }
        console.log('File details:', file);

        const filename = `${Date.now()}_${file.name}`;
        const uploadDir = path.resolve(__dirname, './uploads', folder);


        await fs.promises.mkdir(uploadDir, { recursive: true });

        const filePath = path.join(uploadDir, filename);


        await file.mv(filePath, (err) => {
            if (err) {
                throw err;
            }
        });

        return filename; 
    } catch (error) {
        console.error('Error in uploadFile:', error);
        throw error;
    }
};

module.exports = {
    uploadFile
};
