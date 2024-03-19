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
            include: [
                {
                    association: "rol",
                },
            ],
        })
            .then((user) => {
                res.render("users/dashboard", {
                    title: "Dashboard",
                    user,
                    usuario: req.session.user,
                });
            })
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
            res.render("users/login", { errors: errors.mapped(), old: req.body });
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
            res.render("users/register", { errors: errors.mapped(), old: req.body });
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
        console.log("aqui la session",req.session.user);
        db.User.findByPk(id)
            .then((user) => {
                req.session.user = user.dataValues
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

    profileEdited: async function (req, res) {
        try {
            const { id } = req.params;
            const {
                nombre,
                email,
                direction,
                number,
                phone,
                genre,
                rol,
                age,
                avatar,
            } = req.body;

            const user = await db.User.findByPk(id);
            
            const deletePreviousImage = async (imagenuser) => {
                if (imagenuser && imagenuser !== "default-avatar-profile.jpg") {
                    const imagePath = path.join(
                        __dirname,
                        "../../public/img/users/",
                        imagenuser
                    );
                    try {
                        await fs.promises.unlink(imagePath);
                        console.log(`Imagen anterior "${imagenuser}" eliminada`);
                    } catch (error) {
                        console.error(`Error de eliminacion de  image: ${error}`);
                    }
                }
            };

            const updateuser = await user.update({
                username: nombre,
                email,
                direction,
                number,
                phone,
                birthday: age,
                genre,
                rol_id: rol,
                avatar: req.file ? req.file.filename : avatar,
                updatedAt: new Date(),
            });

            res.redirect("/users/dashboard");
        } catch (err) {
            console.error(err);
        }
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
