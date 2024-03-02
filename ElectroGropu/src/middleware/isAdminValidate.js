const session = require("express-session");

const isAdminValidate = (req,res,next) => {
    if (req.session.user && req.session.rol_id == 2) {
        next();
    }else{
        res.redirect("/")
    }

}

module.exports = isAdminValidate;
