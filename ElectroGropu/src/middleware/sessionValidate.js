const sessionValidate = (req,res,next)=>{
    if(req.session.user){
        next()
    }
    res.redirect("/users/login");
}

module.exports = sessionValidate