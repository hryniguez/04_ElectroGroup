const express = require('express');
const fs = require("fs")
const router = express.Router();
const {login,register,createUser,processlogin,logout,dashboard,profile,profileEdited} = require("../controllers/userControllers");
const loginValidator = require("../validations/loginValidator");
const registerValidator = require("../validations/registerValidator");
const upload = require('../validations/uploadUser');








/* GET users listing. */
router.get('/login', login);
router.post('/login',loginValidator, processlogin);
router.get('/register', register);
router.post('/register', upload.single('image'),registerValidator, createUser);
router.get('/logout', logout)
router.get('/dashboard', dashboard)
router.get("/userProfile/:id", profile);
router.put('/userProfile/:id', upload.single('image'), profileEdited)



module.exports = router;
