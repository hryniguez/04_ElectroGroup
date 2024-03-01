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
                association: "rol"
            }],
            
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
                email: email,
                birthday: "12-02-12",
                genre: "indistinto",
                rol_id: null,
                avatar: req.file ? req.file.filename : "default.jpg",
                password: bcrypt.hashSync(password, 10),
            })
                .then((user) => {
                    res.redirect("/login");
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
        const { nombre, email, password, phone, genre, rol } = req.body;
        db.User.findByPk(id);

        const usuarios = users.map((user) => {
            if (user.id == id) {
                return {
                    id,
                    usernombre: nombre.trim(),
                    email: email.trim(),
                    birthday,
                    direction,
                    phone,
                    genre,
                    image: req.file ? req.file.filename : user.image,
                    password: user.password,
                    rol: rol ? rol : "user",
                };
            }
            return user;
        });
        setJson(usuarios, "users");
        res.redirect(`/users/userProfile/${id}`);
    },

    destroy: (req, res) => {
        const { id } = req.params;
        const user = getJson("users");

        let users = user.find((user) => user.id == id);
        let userClear = user.filter((user) => user.id !== req.params.id);

        fs.unlink(
            path.join(__dirname, `../../public/img/users/${users.image}`),
            (err) => {
                if (err) throw err;
                console.log(`borre el archivo ${users.image}`);
            }
        );

        setJson(userClear, "users");
        res.redirect("/users/dashboard");
    },
};
module.exports = usercontrollers;
