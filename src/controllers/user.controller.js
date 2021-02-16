const userCtrl = {};

const User = require('../models/User');
const passport = require('passport');

userCtrl.renderSignupForm = (req, res)=>{
    res.render('users/signup');
};


userCtrl.signup = async(req,res)=>{
    const errors =[];
    const { name, email, password, confirm_password} = req.body;
    if(password != confirm_password){
        errors.push({text:'Contraseña no conincide!!'});
    }
    if(password.length < 6){
        errors.push({text:'La contraseña debe contener mas de 6 caracteres'});
    }
    if(errors.length > 0){
        res.render('users/signup', {
            errors,
            name,
            email,
            password,
            confirm_password
        });
    }else{
     const emailUser = await User.findOne({email:email});
     if(emailUser){
         req.flash('mensajeError','Correo ya registrado');
         res.redirect('/users/signup');
     }else{
         const newUser = new User({name,email,password});
         newUser.password = await newUser.encriptarConstrasena(password);
         await newUser.save();
         req.flash('menviarMensaje','Registrado');
         res.redirect('/users/signin');
     }
    }

};

userCtrl.renderSigninForm = (req, res)=>{
    res.render('users/signin');
};

userCtrl.signin = passport.authenticate('local',{
    failureRedirect:'/users/signin',
    successRedirect:'/notes',
    failureFlash: true
})
    


userCtrl.logout = (req,res)=>{
   req.logout();
   req.flash('enviarMensaje','Sesion finalizada');
   res.redirect('/users/signin');
};

module.exports = userCtrl;