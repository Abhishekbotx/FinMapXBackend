const express = require('express')
const { PORT } = require('./src/config/dotenvConfig') 
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const db=require('./src/config/dbConfig')
const cors = require('cors') 
const app = express(); 
const path = require('path');
// const cloudinary=require('./src/config/cloudinaryConfig')
app.use(cors(
    {
        origin:'http://localhost:3000',
        credentials:true
    }
));
 



app.use( express.static(path.join('./src/utils/uploads')));

// Endpoint to list all images in 'public/uploads/reviewImages'
// app.get('/api/images', (req, res) => {
//     const imagesDir = path.join(__dirname, 'public/uploads/reviewImages');
//     fs.readdir(imagesDir, (err, files) => {
//         if (err) {
//             return res.status(500).send('Unable to scan directory');
//         }
//         const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));
//         const imageUrls = imageFiles.map(file => `${req.protocol}://${req.get('host')}/public/uploads/reviewImages/${file}`);
//         res.json(imageUrls);
//     }); 
// });

app.use(express.static('/public'))
const apiRoutes = require('./src/routes/index');
app.use(cookieParser());
app.use(
    fileUpload({ 
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)
app.use(express.json());
const prepareAndStartServer = () => {
    app.use('/api', apiRoutes); 
    
    db.connect()
    // cloudinary.cloudinaryConnect()
    app.listen(PORT, () => {
        console.log(`server running on port:${PORT}`)
    })
}

prepareAndStartServer()