const {body} = require('express-validator');
const db = require('../../database/models'); 
const User = db.User; 

module.exports = [
    body('nombre').notEmpty().withMessage("El campo no puede estar vacio").bail()
    .isLength({min:3,max:30}).withMessage("El valor ingresado debe tener al menos 3 caracteres y maximo 30").bail(),

    body('surname').notEmpty().withMessage("El campo no puede estar vacio").bail()
    .isLength({min:3,max:30}).withMessage("El valor ingresado debe tener al menos 3 caracteres y maximo 30").bail(),
    
    body('age').notEmpty().withMessage("El campo no puede estar vacio").bail()
    .isInt().withMessage("La edad debe ser valida - solo aceptamos numeros enteros").bail()
    .custom((value)=> {
        return value >= 18;
    }).withMessage("Debe ser mayor de 18 años para registrarse"),
    
    body('email').notEmpty().withMessage("El campo no puede estar vacio").bail()
    .isEmail().withMessage('Debe ser un correo con formato valido').bail()
    .custom(value => {
        const user = users.find(elemento => elemento.email == value);
        return user ? false : true
    }).withMessage("! EL USUARIO YA EXITE !"),
    
    body('password').notEmpty().withMessage("El campo no puede estar vacio").bail()
    .custom((value,{req})=> {
        return value == req.body.password2;
    }).withMessage("Los password no coinciden"),

    body('date').notEmpty().withMessage("El campo no puede estar vacio").bail()
    .custom(value => {
        return !isNaN(Date.parse(value))
    })
    .withMessage("El Campo tiene que ser una fecha valida").bail(),

    body('image').custom((value, {req})=>{
        if (req.errorValidationImage) {
            return false;
        };
        return true;
    }).withMessage("No es un tipo de archivo valido")
    
]