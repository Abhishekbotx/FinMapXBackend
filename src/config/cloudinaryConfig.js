const cloudinary = require("cloudinary").v2; 
const{CLOUD_NAME,API_KEY,API_SECRET}=require('./dotenvConfig')

exports.cloudinaryConnect = () => {
	try {
		cloudinary.config({
			
			cloud_name:CLOUD_NAME ,
			api_key: API_KEY,
			api_secret:API_SECRET,
		});

        console.log('cloudinary connection successful');
	} catch (error) {
        console.error('error in connecting to cloudinary db')
		// console.log(error);
	}
};