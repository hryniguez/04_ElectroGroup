const express = require('express');
const path = require('path');
const router = express.Router();
const isAdmin = require("../middleware/isAdminValidate");
const multer = require('multer');
const {products,productDetail, productCart,formCreate,dashboard,create,editProduct,formEdit,destroy} = require("../controllers/productControllers")
const sessionValidate = require("../middleware/sessionValidate");

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
    cb(null,path.join(__dirname,'../../public/img/products'))
    },
    filename: (req,file,cb) =>{
    let newFile = "image-"+ Date.now()+ path.extname(file.originalname);
    cb(null,newFile)
    }
})

const upLoad = multer({storage});
const upLoad2 = multer({storage});
router
.get('/productDetail/:id', productDetail)
.get('/', products)
.get('/productCart',sessionValidate, productCart)
.get('/dashboard', dashboard)
.get('/createProduct', formCreate)
.post('/createProduct', upLoad2.single("image"), create)
.delete('/delete/:id', destroy)
.get('/editProduct/:id',formEdit)
.put('/editProduct/:id', upLoad.array('images'),editProduct)



module.exports = router