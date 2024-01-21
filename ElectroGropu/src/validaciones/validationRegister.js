const {body} = require('express-validator');
const {getJson} = require("../utility/jsonMethod");
const users = getJson('users');

module.exports = [
    body('usuario').notEmpty().withMessage("El campo no puede estar vacio").bail()
    .isLength({min:3,max:30}).withMessage("El valor ingresado debe tener al menos 3 caracteres y maximo 30").bail(),
    
    body('correo').notEmpty().withMessage("El campo no puede estar vacio").bail()
    .isEmail().withMessage('Debe ser un correo con formato valido').bail()
    .custom(value => {
        console.log("value:",value);        
        const user = users.find(elemento => elemento.correo == value);
        return user ? false : true
    }).withMessage("El usuario ya existe, utilice otro correo electronico"),

    body('contraseña').notEmpty().withMessage("El campo no puede estar vacio").bail(),

    body('contraseñaB').notEmpty().withMessage("El campo no puede estar vacio").bail()
    .custom((value)=> {
        return value == req.body.contraseñaB;
    }).withMessage("Los password no coinciden"),

    body('avatar').custom(({req})=>{
        if (req.errorValidationAvatar) {
            return false;
        };
        return true;
    }).withMessage("No es un tipo de archivo valido")
];