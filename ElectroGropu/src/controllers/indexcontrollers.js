const fs = require("fs");
const path = require("path");
const json = fs.readFileSync(path.join(__dirname,"../data/products.json"),"utf-8")
const products = JSON.parse(json);

const indexcontrollers = {
  home: function (req, res) {
    res.render("index", { title: "ElectroGroup", products });
  },
  about: function (req, res) {
    res.render("about", { title: "about", about });
  },
  contact: function (req, res) {
    res.render("contact", { title: "contact", contact });
  },
};

module.exports = indexcontrollers;
