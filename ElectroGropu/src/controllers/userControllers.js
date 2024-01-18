const path = require('path');
const fs = require('fs');
const {setJson,getJson} = require("../utility/jsonMethod");

const usercontrollers = {
    login: function (req, res) {
        res.render("users/login", { title: "login" });
    },
    register: function (req, res) {
        res.render("users/register", { title: "register" });
    },
    createUser:(req,res)=> {
        console.log(req.body);
        const dir = path.join(__dirname, '../','data','users.json')
        let products = getJson("users");
        products.push(req.body);
        let nuevoArray = JSON.stringify(products);
        setJson(users,"users");
        res.redirect("/")
    },
};

module.exports = usercontrollers;
