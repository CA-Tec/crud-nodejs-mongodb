const {Router} = require('express');
const router = Router();

const { 
renderSigninForm, 
renderSignupForm,
signin,
signup,
logout
} = require('../controllers/user.controller');


router.get('/users/signup',renderSignupForm);

router.post('/users/signup',signup);

router.get('/users/signin',renderSigninForm);

router.post('/users/signin',signin);

router.get('/users/logout',logout);

module.exports =router;