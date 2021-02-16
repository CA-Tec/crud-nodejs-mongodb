const helpers ={};

helpers.isAuthenticated = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('mensajeError','No esta autorizado');
    res.redirect('/users/signin');
};

module.exports = helpers;