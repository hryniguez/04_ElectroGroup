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
    }
}
module.exports = usercontrollers;
