const path = require('path');
const fs = require('fs');

const usercontrollers = {
    login: function (req, res) {
        res.render("login", { title: "login" });
    },
    register: function (req, res) {
        res.render("register", { title: "register" });
    },
    createUser:(req,res)=> {
        console.log(req.body);
        const dir = path.join(__dirname, '../','data','users.json')
        let products = JSON.parse(fs.readFileSync(dir,'utf-8'));
        products.push(req.body);
        let nuevoArray = JSON.stringify(products);
        fs.writeFileSync(dir,nuevoArray,"utf-8");
        res.redirect("/")
    },
};

module.exports = usercontrollers;
