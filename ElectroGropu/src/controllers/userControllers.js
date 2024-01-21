const {setJson,getJson} = require("../utility/jsonMethod");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');

const usercontrollers = {
    login: function (req, res) {
        res.render("users/login", { title: "login" });
    },
    register: function (req, res) {
        res.render("users/register", { title: "register" });
    },
    createUser: (req, res) => {
        const errores = validationResult(req);
        
        console.log("errores:", errores);
        
        if(!errores.isEmpty()){
        console.log("Ingrese en errores");
        res.render('./users/register',{errores:errores.mapped(),old:req.body,title:"registro"})
        }
        else{
        const users = getJson("users");
        const {name,surname,email,age,date,password} = req.body;
        const id = uuidv4();
        const user = {
        id,
        name: name.trim(),
        surname:surname.trim(),
        email:email.trim(),
        age,
        date,
        image:req.file ? req.file.filename : "default.jpg", 
        password: bcrypt.hashSync(password,10),
        }
        setJson(users,"users");
        res.redirect('./users/login');
    }
    }
}
module.exports = usercontrollers;
