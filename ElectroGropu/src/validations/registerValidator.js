const {body} = require('express-validator');
const  db = require('../database/models'); 


module.exports = [
    
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



    body('date').notEmpty().withMessage("El campo no puede estar vacio").bail()
    .custom(value => {
        return !isNaN(Date.parse(value))
    })
    .withMessage("El Campo tiene que ser una fecha valida").bail(),

   
]