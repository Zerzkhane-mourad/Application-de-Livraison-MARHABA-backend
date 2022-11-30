const express = require("express");
const user = require('../controllers/Usercontrollers');
const livreur = require('../controllers/Livreurcontrollers')
const {requireSignIn} = require('../middlewares/auth');
const {chekrole} = require('../middlewares/auth');
const {userSignupValidator } = require('../middlewares/userValidator');
const {userSigninValidator } = require('../middlewares/userValidator');
const route = express.Router();


route.post('/signup',userSignupValidator ,user.createUser);
route.post('/signin',userSigninValidator ,user.login);
route.get('/signout',user.signout);
route.get('/home',requireSignIn, chekrole);
route.post('/forgetpassword',user.forgetpassword);
route.post('/resetpassword/:token',user.resetpassword);

route.post('/addlivreur',userSignupValidator ,livreur.CreateLivreur)

module.exports = route