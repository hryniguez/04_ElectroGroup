const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname,'../../public/img'))
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + uuidv4();
        cb(null, path.basename(file.originalname,path.extname(file.originalname)) + '-' + uniqueSuffix + path.extname(file.originalname))
      }
});




module.exports = multer({storage})