const fs = require("fs");
const path = require("path");
const db = require('../database/models')

const indexcontrollers = {
  home: function (req, res) {
    db.Product.findAll({
      include:
            [{
                association: "Images"
            }]
    } )
    .then( (product)=>{
      res.render("index", { title: "ElectroGroup",product,usuario:req.session.user });
    })
    .catch(error => {
      console.log(error);
  });
    
  },
  about: function (req, res) {
    res.render("about", { title: "about", about });
  },
  contact: function (req, res) {
    res.render("contact", { title: "contact", contact });
  },
};

module.exports = indexcontrollers;
