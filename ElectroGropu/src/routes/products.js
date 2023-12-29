const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');
const {productDetail, productCart,formCreate,dashboard,create,formUpdate,update,productDelete,editProduct,formEdit} = require("../controllers/productControllers")

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
    cb(null,path.join(__dirname,'../../public/img'))
    },
    filename: (req,file,cb) =>{
    let newFile = "image-"+ Date.now()+ path.extname(file.originalname);
    cb(null,newFile)
    }
})

const upLoad = multer({storage});

router
.get('/productDetail/:id', productDetail)
.get('/productCart', productCart)
.get('/dashboard', dashboard)
.get('/createProduct', formCreate)
.post('/create', create)
.get('/formUpdate/:id',formUpdate)
.put('/update/:id', update)
.delete('/delete/:id', productDelete)
.get('/editProduct/:id',formEdit)
.put('/editProduct/:id', upLoad.array('imagenProducto'),editProduct)



module.exports = router