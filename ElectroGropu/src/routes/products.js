const express = require('express');
const router = express.Router();
const {productDetail, productCart,formCreate,dashboard,create,formUpdate,update,productDelete} = require("../controllers/productControllers")

router.get('/productDetail', productDetail)
router.get('/productDetail/:id', productDetail)
router.get('/productCart', productCart)
router.get('/dashboard', dashboard)
.post('/create', create)
router.get('/productcreate', formCreate)
.get('/formUpdate/:id',formUpdate)
.put('/update/:id', update)
.delete('/delete/:id', productDelete)

module.exports = router