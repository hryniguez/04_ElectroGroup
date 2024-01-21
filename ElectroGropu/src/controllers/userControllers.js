const {setJson,getJson} = require("../utility/jsonMethod");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const e = require("method-override");
const usercontrollers = {
    login: function (req, res) {
        res.render("users/login", { title: "login" });
    },
    dashboard: (req, res) => {
        const user = getJson("users");
        res.render('users/dashboard', { title: "Dashboard", user,usuario:req.session.user });
        },
    logout:(req,res)=>{
        req.session.destroy();
        if (req.cookies.user) {
          res.clearCookie('user');
          res.clearCookie('remember');
        }
        res.redirect('/');
      },
    processlogin: (req, res) => {
        const errors = validationResult(req);
      
        if (!errors.isEmpty()) {
            
            res.render("users/login", { errors: errors.mapped(), title: "ELECTRO", usuario: req.session.user });
        }else{

            const {email} = req.body;
            const users = getJson("users");
            const user = users.find(usuario => usuario.email == email);
            req.session.user = user;
            
            
            res.cookie('user',user,{maxAge: 1000 * 60 });;
            if(req.body.remember == "true") {
                res.cookie('rememberMe',"true", {maxAge: 1000 * 60 * 15 });
              }
            res.redirect('/');
        }

    },
    register: function (req, res) {
        res.render("users/register", { title: "register" });
    },
    createUser: (req, res) => {
        const errors = validationResult(req);
console.log(errors);
        if (!errors.isEmpty()) {
            console.log("Ingrese en errors");
            res.render('users/register', { errors: errors.mapped(), old: req.body });
        }else{

            const users = getJson("users");
            const { nombre,  email,  password, rol } = req.body;
            const id = uuidv4();
            const user = {
                id,
                nombre: nombre.trim(),
                email: email.trim(),
                image: req.file ? req.file.filename : "default.jpg",
                password: bcrypt.hashSync(password, 10),
                rol: rol ? rol : "user"
            }
            users.push(user)
            setJson(users, "users");
            res.redirect('/');
        }
        
        
    },
<<<<<<< HEAD

    editForm :(req,res,next) => {
        res.render("users/userEdition", { title: "editar usuario"
        })
    }
};
=======
    
    
}
>>>>>>> develop

module.exports = usercontrollers;
