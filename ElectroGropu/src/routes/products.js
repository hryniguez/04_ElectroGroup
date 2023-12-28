const express = require('express');
const router = express.Router();
const {productDetail, productCart,formCreate,dashboard,create,formUpdate,update,productDelete} = require("../controllers/productControllers")
const multer = require("multer");
const path = require("path")

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,path.join(__dirname, "../../public/img"));
    },
    filename: (req,file,cb) =>{
        cb(null,`${Date.now()}_img_${path.extname(file.originalname)}`);
    }
});
const upload = multer({storage});



router
.get('/productDetail/:id', productDetail)
.get('/productCart', productCart)
.get('/dashboard', dashboard)
.get('/createProduct', formCreate)
.post('/createProduct', upload.single("image"), create)
.get('/formUpdate/:id',formUpdate)
.put('/update/:id', update)
.delete('/delete/:id', productDelete)

module.exports = router