const isAdminValidate = (req,res,next) => {
    if (req.session.user && req.session.user.rol == "admin") {
        next();
    };
    res.redirect("/");
}

module.exports = isAdminValidate;