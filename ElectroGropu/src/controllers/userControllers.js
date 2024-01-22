const fs = require("fs");
const path = require("path");
const {setJson,getJson} = require("../utility/jsonMethod");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');



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

    profile:(req,res,next) => {
      const {id} = req.params;
      const users = getJson("users");
      const user = users.find(user => user.id == id);
      res.render("./users/profile", { title: "Perfil de usuario",user, usuario: req.session.user});
    },

    formProfile:(req,res,next) => {
        const {id} = req.params;
        const users = getJson("users");
        const user = users.find(user => user.id == id);
        res.render("./users/userEdition", { title: "editar usuario",user, usuario: req.session.user});
    },

    profileEdited:(req,res)=>{
        const {id} = req.params;
        const {nombre,email,age,direction,phone,genre,rol} = req.body;
        const users = getJson("users");
        
        const usuarios = users.map(user => {
          if (user.id == id) {
            return {
              id,
              nombre: nombre.trim(),
              email:email.trim(),
              age,
              direction,
              phone,
              genre,
              image:req.file ? req.file.filename : user.image, 
              password: user.password,
              rol: rol ? rol : "user"
            }
          }
          return user
        });
        setJson(usuarios,"users");
        res.redirect(`/users/userProfile/${id}`);
      },
      destroy: (req, res) => {
        const {id}= req.params;
        const user = getJson("users");
            
            let users = user.find(user => user.id == id);
            let userClear = user.filter(user => user.id !== req.params.id);
    
            fs.unlink(path.join(__dirname,`../../public/img/users/${users.image}`), (err) =>{
                if(err) throw err;
                console.log(`borre el archivo ${users.image}`);
            })
          
            setJson(userClear,"users");
            res.redirect ('/users/dashboard')
    
    
        
    },
}

module.exports = usercontrollers;
