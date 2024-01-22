const express = require('express');
const fs = require("fs")
const router = express.Router();
const {login,register,createUser,processlogin,logout,dashboard,formProfile,profileEdited,profile} = require("../controllers/userControllers");
const loginValidator = require("../validations/loginValidator");
const registerValidator = require("../validations/validationRegister");
const upload = require('../validations/uploadUser');




/* user login. */
router.get('/login', login);
router.post('/login',loginValidator, processlogin);
/* user register. */
router.get('/register', register);
router.post('/register', upload.single('image'),registerValidator, createUser);
/* user logout. */
router.get('/logout', logout)
/* user dashboard. */
router.get('/dashboard', dashboard)
/* user profile. */
router.get("/userProfile/:id",profile)
router.get("/profileEdit/:id", formProfile);
router.put('/profileEdit/:id', upload.single('image'), profileEdited)



module.exports = router;
