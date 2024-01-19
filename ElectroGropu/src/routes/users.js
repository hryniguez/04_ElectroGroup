const express = require('express');
const router = express.Router();
const {login,register,createUser} = require("../controllers/userControllers");
const upload = require('../validaciones/validationAvatarUser');
const validationRegister = require("../validaciones/validationRegister");


/* GET users listing. */
router.get('/login', login);
router.get('/register',validationRegister ,register);
router.post('/register',upload.single('avatar') ,ValidationAvatar ,createUser);

module.exports = router;
