const express = require("express");
const user = require('../controllers/Usercontrollers')
const {requireSignIn} = require('../middlewares/auth')
const {chekrole} = require('../middlewares/auth')
const route = express.Router();


route.post('/adduser' ,user.createUser)
route.post('/login',user.login)
route.get('/signout',user.signout)
route.get('/home',requireSignIn, chekrole)
route.post('/forgetpassword',user.forgetpassword)
route.post('/resetpassword/:token',user.resetpassword)


module.exports = route