const dotenv=require('dotenv');

dotenv.config();

module.exports={
    PORT:process.env.PORT,
    JWT_KEY:process.env.JWT_KEY,
    ADMIN_JWT_KEY:process.env.ADMIN_JWT_KEY,
    MAIL_PASS:process.env.MAIL_PASS,
    MAIL_USER:process.env.MAIL_USER,
    MAIL_HOST:process.env.MAIL_HOST,
    CLOUD_NAME:process.env.CLOUD_NAME,
    API_KEY:process.env.API_KEY, 
    API_SECRET:process.env.API_SECRET,
    FOLDER:process.env.FOLDER,  
    ADMIN_FOLDER:process.env.ADMIN_FOLDER, 
    Mongo_URL:process.env.Mongo_URL,
    OPENAI_API_KEY:process.env.OPENAI_API_KEY

}