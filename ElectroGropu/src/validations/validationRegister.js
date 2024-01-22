const {body} = require('express-validator');
const {getJson} = require("../utility/jsonMethod");
const users = getJson('users');

module.exports = [
    body('nombre').notEmpty().withMessage("El campo no puede estar vacio").bail()
    .isLength({min:3,max:30}).withMessage("El valor ingresado debe tener al menos 3 caracteres y maximo 30").bail(),
    
    body('email').notEmpty().withMessage("El campo no puede estar vacio").bail()
    .isEmail().withMessage('Debe ser un correo con formato valido').bail()
    .custom(value => {
        console.log("value:",value);        
        const user = users.find(elemento => elemento.email == value);
        return user ? false : true
    }).withMessage("El usuario ya existe, utilice otro correo electronico"),

    body('password').notEmpty().withMessage("El campo no puede estar vacio").bail()
    .custom((value,{req})=> {
        return value == req.body.password2;
    }).withMessage("Los password no coinciden"),    

    body('image').custom((value,{req})=>{
        if (req.fileValidationError) {
            return false;
        };
        return true;
    }).withMessage("No es un tipo de archivo valido")
];