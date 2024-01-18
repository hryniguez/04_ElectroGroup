const express = require('express');
const router = express.Router();
const {login,register,createUser,processlogin} = require("../controllers/userControllers");
const { check } = require('express-validator');
const validateRegister = [
    check('nombre').notEmpty().withMessage('Debes completar el nombre'),
    check('apellido').notEmpty().withMessage('Debes completar el apellido'),
    check('email').notEmpty().withMessage('Debes completar el email').bail().isEmail().withMessage('Debes completar un email valido').bail()
    .custom(value=>{const dir = path.join(__dirname, '../data/users.json')
    let products = JSON.parse(fs.readFileSync(dir,'utf-8'));
    const user = products.find(elemento => elemento.email == value);
    return user ? true : false

    }).withMessage('NO EXITE EL USUARIO'),
    check('contraseña').notEmpty().withMessage('Debes completar la contraseña')
    ]








/* GET users listing. */
router.get('/login', login);
router.post('/login',validateRegister, processlogin);
router.get('/register', register);
router.post('/register', createUser);

module.exports = router;
