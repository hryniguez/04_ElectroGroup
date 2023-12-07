const express = require('express');
const router = express.Router();
const {login,register,createUser} = require("../controllers/userControllers");
/* GET users listing. */
router.get('/login', login);
router.get('/register', register);
router.post('/register', createUser);

module.exports = router;
