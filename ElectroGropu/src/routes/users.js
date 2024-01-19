const express = require('express');
const router = express.Router();
const {login,register,createUser,processlogin} = require("../controllers/userControllers");
const { check } = require('express-validator');
const validatelogin = [
    check('nombre').notEmpty().withMessage('Debes completar el nombre'),
    check('apellido').notEmpty().withMessage('Debes completar el apellido'),
    check('email').notEmpty().withMessage('Debes completar el email').bail().isEmail().withMessage('Debes completar un email valido').bail()
    .custom(value=>{const dir = path.join(__dirname, '../data/users.json')
    let products = JSON.parse(fs.readFileSync(dir,'utf-8'));
    const user = products.find(elemento => elemento.email == value);
    return user ? true : false

    }).withMessage('! EL USUARIO NO EXITE ! ' ).bail(),
    check('contraseña').notEmpty().bail().withMessage('Debes completar la contraseña').bail()
    ]
    const validateRegister = [
        check('nombre').notEmpty().withMessage('Debes completar el nombre'),
        check('apellido').notEmpty().withMessage('Debes completar el apellido'),
        check('email').notEmpty().withMessage('Debes completar el email').bail().isEmail().withMessage('Debes completar un email valido').bail()
        .custom(value=>{const dir = path.join(__dirname, '../data/users.json')
        let products = JSON.parse(fs.readFileSync(dir,'utf-8'));
        const user = products.find(elemento => elemento.email == value);
        return user ? true : false
    
        }).withMessage('! El email ya esta registrado ! ' ).bail(),
        check('contraseña').notEmpty().bail().withMessage('Debes completar la contraseña').bail()
        ]








/* GET users listing. */
router.get('/login', login);
router.post('/login',validatelogin, processlogin);
router.get('/register', register);
router.post('/register',validateRegister, createUser);

module.exports = router;
