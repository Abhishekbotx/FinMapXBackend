const { uploadFile } = require('./fileupload');
const upload=async(req,res)=>{


try {
    const uploadPath = __dirname + "/uploads"; 
    console.log('uploadpath:',uploadPath)
    const file = req.files.file; 

    console.log('beforefileupload')
    const filePath = await uploadFile(file, uploadPath);
    console.log('afterfileupload')
    console.log('File uploaded successfully:', filePath);

    res.json({
        success: true,
        message: 'File uploaded successfully',
        filePath: filePath
    });
} catch (error) {
    console.error('Error uploading file:', error.message);

    res.status(500).json({
        success: false,
        message: 'Error uploading file'
    });
}
}

module.exports=upload
