const path = require('path');
const fs = require('fs');
const {setJson,getJson} = require("../utility/jsonMethod");
const { validationResult } = require('express-validator');
const usercontrollers = {
    login: function (req, res) {
        res.render("users/login", { title: "login" });
    },
    processlogin:(req,res)=> {
        let errors = validationResult(req);
        const {email} = req.body;
        let products = getJson("users");
        const user = products.find(usuario => usuario.email == email);
        if (user) {
            req.session.user = user;
            res.cookie('email',user.email,{maxAge: 1000 * 60 });;
            console.log("session:",req.session);
            res.redirect('/');
        
    } else {
        res.render('users/login', { errors: errors.mapped(), old: req.body });
    } },
    register: function (req, res) {
        res.render("users/register", { title: "register" });
    },
    createUser:(req,res)=> {
        console.log(req.body);
        let products = getJson("users");
        products.push(req.body);
        setJson(products,"users");
        res.redirect("/")
    },
};

module.exports = usercontrollers;
