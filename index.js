const express = require('express')
const { PORT } = require('./src/config/dotenvConfig') 
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const db=require('./src/config/dbConfig')
const cors = require('cors') 
const app = express(); 
const path = require('path');



// const allowedOrigins = [
//     "http://localhost:3000",
//     "http://localhost:3002/",
//     // "http://localhost:5175/",
//     "https://finmapxfrontendx.vercel.app/",
//   ];

app.use(  
  cors({
    // origin: "http://localhost:3001", 
      origin: "https://finmapxtest.vercel.app", 
      credentials: true, 
      methods: ["GET", "POST", "PUT", "DELETE"],
    }) 
  );

  // app.use(cors());
  




app.use( express.static(path.join('./src/utils/uploads')));



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
app.get("/", (req, res) => {
    res.send(`<h1> This is HOMEPAGE baby</h1>`);
  });
const prepareAndStartServer = () => {
    app.use('/api', apiRoutes); 
    
    db.connect()
    // cloudinary.cloudinaryConnect()
    app.listen(PORT, () => {
        console.log(`server running on port:${PORT}`)
    })
}

prepareAndStartServer()