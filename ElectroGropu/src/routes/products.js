const express = require('express');
const router = express.Router();
const {productDetail, productCart,formCreate,dashboard,create,formUpdate,update,productDelete,products} = require("../controllers/productControllers")

router
.get('/productDetail/:id', productDetail)
.get("/", products)
.get('/productCart', productCart)
.get('/dashboard', dashboard)
.get('/createProduct', formCreate)
.post('/create', create)
.get('/formUpdate/:id',formUpdate)
.put('/update/:id', update)
.delete('/delete/:id', productDelete)

module.exports = router