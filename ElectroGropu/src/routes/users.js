const express = require('express');
const router = express.Router();
const {login,register,createUser,editForm,editUser} = require("../controllers/userControllers");
/* GET users listing. */
router.get('/login', login);
router.get('/register', register);
router.post('/register', createUser);
router.get("/editUser", editForm);
//router.put("/editUser/:id", editUser)

module.exports = router;
