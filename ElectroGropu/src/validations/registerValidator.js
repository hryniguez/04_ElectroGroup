const {body} = require('express-validator');
const { db }= require('../database/models'); 


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
    body('email').notEmpty().withMessage("El campo no puede estar vacío")
    .isEmail().withMessage('Debe ser un correo con formato válido')
    .isEmail().withMessage('*Debe ser un correo con formato valido*').bail()
    .custom(value => {
        return db.User.findOne({
            where: {
                email: value
            }
        })
        .then(user => {
            console.log(value);
            if (user) {
                return Promise.reject('El email se encuentra registrado')
            }
        })
        .catch(() => {
            return Promise.reject('El email se encuentra registrado')
        })
}),



    body('password').notEmpty().withMessage("*El campo no puede estar vacio*").bail()
    .custom((value,{req})=> {
        return value == req.body.password2;
    }).withMessage("*Los password no coinciden*"),

    body('image').custom((value, {req})=>{
        if (req.errorImgProfile) {
            return false;
        };
        return true;
    }).withMessage("*Esta imagen no tiene un formato valido*"),

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