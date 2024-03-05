const {body} = require('express-validator');
const  db = require('../database/models'); 


module.exports= [
body('titulo').notEmpty().withMessage("El campo no puede estar vacio").bail()
.isLength({min:3,max:30}).withMessage("El valor ingresado debe tener al menos 3 caracteres y maximo 30").bail(),
body ('descripcion').notEmpty().withMessage("El campo no puede estar vacio").bail()
.isLength({min:3,max:30}).withMessage("El valor ingresado debe tener al menos 3 caracteres y maximo 500").bail(),
body ('precio').notEmpty().withMessage("El campo no puede estar vacio").bail()
.isInteger(numero).withMessage('El número debe ser un entero.'),
body('images').custom((value,{req})=>{
    if (req.fileValidationError) {
        return false;
    };
    return true;
}).withMessage("No es un tipo de archivo valido")

]