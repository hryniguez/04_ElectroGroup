const db = require("../database/models");
const { Op, DATE } = require("sequelize");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const usercontrollers = {
    login: function (req, res) {
        res.render("users/login", { title: "login" });
    },
    dashboard: (req, res) => {
        db.User.findAll({
            include:
            [{
                association: "rol", 
               
            }]
            
        })
            .then( (user)=>{

                res.render("users/dashboard", {
                    title: "Dashboard",
                    user,
                    usuario: req.session.user,
                })
            }
            )
            .catch((err) => {
                console.log(err);
            });
    },
    logout: (req, res) => {
        req.session.destroy();
        if (req.cookies.user) {
            res.clearCookie("user");
            res.clearCookie("remember");
        }
        res.redirect("/");
    },
    processlogin: (req, res) => {
        const errors = validationResult(req);
        // res.send(errors)
        if (!errors.isEmpty()) {
            console.log("probandinnng:", errors.mapped());
            res.render("users/login", {
                errors: errors.errors,
                title: "ELECTRO",
                usuario: req.session.user,
            });
        } else {
            const { email } = req.body;
            db.User.findOne({
                attributes: { exclude: ["password"] },
                where: { email },
            })
                .then((user) => {
                    req.session.user = user.dataValues;
console.log("aqui va el usuario",req.session.user);
                    if (req.body.remember == "true") {
                        res.cookie("user", user.dataValues, { maxAge: 1000 * 60 });
                        res.cookie("rememberMe", "true", { maxAge: 1000 * 60 * 15 });
                    }
                    res.redirect("/");
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },
    profile: (req, res, next) => {
        const { id } = req.params;
        db.User.findByPk(id)
            .then((user) => {
                res.render("./users/profile", {
                    title: "Perfil de usuario",
                    user,
                    usuario: req.session.user,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, 
    register: function (req, res) {
        res.render("users/register", {
            title: "register",
            usuario: req.session.user,
        });
        },
    createUser: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Ingrese en errors");
            res.render('users/register',{ errors: errors.mapped(), old: req.body });
        } else {
            const { nombre, email, password } = req.body;
            db.User.create({
                username: nombre,
                email,
                birthday: "1997-12-01",
                genre: "indistinto",
                rol_id: null,
                avatar: req.file ? req.file.filename : null,
                password: bcrypt.hashSync(password, 10),
            })
                .then((user) => {
                    res.render("users/login", { title: "login" });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },
    formProfile: (req, res, next) => {
        const { id } = req.params;
        db.User.findByPk(id)
            .then((user) => {
                res.render("./users/userEdition", {
                    title: "editar usuario",
                    user,
                    usuario: req.session.user,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    },

    profileEdited: (req, res) => {
        const { id } = req.params;
        const { nombre, email, password, phone, genre, rol , image } = req.body;
        db.User.update(
            {
                username: nombre ,
                    email,
                    birthday: "1997-12-01",
                    genre,
                    image: req.file ? req.file.filename : null,
                   
                    rol_id:  rol ? rol : "2",
            },
            {
                where:{
                id  ,
                } ,
            }
        ).then((resp) => {
            res.redirect(`/users/profile/${id}`);
        })
        .catch((err) => console.log(err));
    },

    destroy: (req, res) => {
        db.User.destroy({
            where: { id: req.params.id },
          })
            
                .then(() => {
                 
                  
                  res.redirect("/users/dashboard");
                })
                .catch((err) => console.log(err));

    },
};
module.exports = usercontrollers;
