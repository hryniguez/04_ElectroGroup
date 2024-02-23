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
        db.User.findAlll(),then()
        {{res.render('users/dashboard', { title: "Dashboard", user,usuario:req.session.user });
        }}.catch()
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
            
            res.render("users/login", {
            errors: errors.mapped(),
            title: "ELECTRO", 
            usuario: req.session.user });
        }else{

            const {email} = req.body;
            db.User.findOne({
              attributes: { exclude: ["password"] },
              where: {
                email,
              },
            })
              .then((user) => {
                console.log("user info:", user);
                req.session.user = user.dataValues;
            
            
                if(req.body.remember == "true") {
                res.cookie('user',user,{maxAge: 1000 * 60 });;
                res.cookie('rememberMe',"true", {maxAge: 1000 * 60 * 15 });
              }
            res.redirect('/');
        })
        .catch((err) => {
          console.log(err);
        });
    }
    },
    register: function (req, res) {
        res.render("users/register", { 
          title: "register",
          usuario: req.session.user,
        });
    },
    createUser: (req, res) => {
        const errors = validationResult(req);
console.log(errors);
        if (!errors.isEmpty()) {
            console.log("Ingrese en errors");
            res.render('users/register', { errors: errors.mapped(), old: req.body });
        }else{

            db.User.create({
              nombre: req.body.nombre,
              apellido: req.body.surname,
              edad: req.body.age,
              email: req.body.email,
              password: req.body.password,
              fechaNacimiento: req.body.date,
            })
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
