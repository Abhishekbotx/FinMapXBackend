const multer = require("multer");
const path = require("path");

const createMulterInstance = (destinationPath) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix +"_"+ path.extname(file.originalname));
    },
  });

  return multer({ storage: storage });
};

module.exports = createMulterInstance;